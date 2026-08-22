import { count, desc, gte, ilike, or, sql } from "drizzle-orm";
import { Router } from "express";
import { db, preorders } from "@workspace/db";
import {
  clearAdminSession,
  createAdminSession,
  hasAdminSession,
  requireAdmin,
  verifyAdminPassword,
} from "../lib/admin-session";

const adminRouter = Router();
const MAX_LOGIN_ATTEMPTS = 6;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const loginAttempts = new Map<string, { attempts: number; windowStartedAt: number }>();

function loginKey(request: { ip?: string }) {
  return request.ip ?? "unknown";
}

function dayKey(value: Date) {
  return value.toISOString().slice(0, 10);
}

function startOfUtcDay(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

function remainingLockoutSeconds(request: { ip?: string }) {
  const key = loginKey(request);
  const attempt = loginAttempts.get(key);
  if (!attempt) {
    return 0;
  }

  const elapsed = Date.now() - attempt.windowStartedAt;
  if (elapsed >= LOGIN_WINDOW_MS) {
    loginAttempts.delete(key);
    return 0;
  }

  if (attempt.attempts < MAX_LOGIN_ATTEMPTS) {
    return 0;
  }

  return Math.ceil((LOGIN_WINDOW_MS - elapsed) / 1000);
}

function recordFailedLogin(request: { ip?: string }) {
  const key = loginKey(request);
  const now = Date.now();
  const attempt = loginAttempts.get(key);

  if (!attempt || now - attempt.windowStartedAt >= LOGIN_WINDOW_MS) {
    loginAttempts.set(key, { attempts: 1, windowStartedAt: now });
    return;
  }

  attempt.attempts += 1;
}

function clearLoginAttempts(request: { ip?: string }) {
  loginAttempts.delete(loginKey(request));
}

adminRouter.post("/admin/login", (request, response) => {
  if (!process.env.ADMIN_PASSWORD) {
    response.status(503).json({
      message: "Admin sign-in is not configured yet. Add ADMIN_PASSWORD in Secrets.",
    });
    return;
  }

  const retryAfterSeconds = remainingLockoutSeconds(request);
  if (retryAfterSeconds > 0) {
    response
      .status(429)
      .set("Retry-After", String(retryAfterSeconds))
      .json({ message: "Too many sign-in attempts. Please try again shortly." });
    return;
  }

  if (!verifyAdminPassword(request.body?.password)) {
    recordFailedLogin(request);
    response.status(401).json({ message: "That password isn't correct." });
    return;
  }

  clearLoginAttempts(request);
  createAdminSession(response);
  response.status(200).json({ authenticated: true });
});

adminRouter.post("/admin/logout", (_request, response) => {
  clearAdminSession(response);
  response.status(204).end();
});

adminRouter.get("/admin/session", (request, response) => {
  response.status(200).json({ authenticated: hasAdminSession(request) });
});

adminRouter.get("/admin/dashboard", requireAdmin, async (request, response) => {
  const search = typeof request.query.q === "string" ? request.query.q.trim().slice(0, 100) : "";
  const searchFilter = search
    ? or(
        ilike(preorders.name, `%${search}%`),
        ilike(preorders.email, `%${search}%`),
        ilike(preorders.country, `%${search}%`),
      )
    : undefined;
  const now = new Date();
  const todayStart = startOfUtcDay(now);
  const weekStart = new Date(todayStart);
  weekStart.setUTCDate(weekStart.getUTCDate() - 6);
  const analyticsStart = new Date(todayStart);
  analyticsStart.setUTCDate(analyticsStart.getUTCDate() - 13);
  const dayExpression = sql<string>`to_char(date_trunc('day', ${preorders.createdAt} AT TIME ZONE 'UTC'), 'YYYY-MM-DD')`;
  const countryExpression = sql<string>`coalesce(nullif(btrim(${preorders.country}), ''), 'Not provided')`;
  const countryCountExpression = sql<number>`count(distinct nullif(btrim(${preorders.country}), ''))`.mapWith(Number);

  try {
    const [
      [total],
      [today],
      [thisWeek],
      [countriesTracked],
      dailyRows,
      countryRows,
      messages,
    ] = await Promise.all([
      db.select({ count: count(preorders.id) }).from(preorders),
      db.select({ count: count(preorders.id) }).from(preorders).where(gte(preorders.createdAt, todayStart)),
      db.select({ count: count(preorders.id) }).from(preorders).where(gte(preorders.createdAt, weekStart)),
      db.select({ count: countryCountExpression }).from(preorders),
      db
        .select({ date: dayExpression, count: count(preorders.id) })
        .from(preorders)
        .where(gte(preorders.createdAt, analyticsStart))
        .groupBy(dayExpression)
        .orderBy(dayExpression),
      db
        .select({ country: countryExpression, count: count(preorders.id) })
        .from(preorders)
        .groupBy(countryExpression)
        .orderBy(desc(count(preorders.id)))
        .limit(6),
      searchFilter
        ? db
            .select()
            .from(preorders)
            .where(searchFilter)
            .orderBy(desc(preorders.createdAt))
            .limit(250)
        : db.select().from(preorders).orderBy(desc(preorders.createdAt)).limit(250),
    ]);

    const dailyCounts = new Map<string, number>();
    for (const row of dailyRows) {
      dailyCounts.set(row.date, row.count);
    }

    const daily = Array.from({ length: 14 }, (_, index) => {
      const date = new Date(todayStart);
      date.setUTCDate(todayStart.getUTCDate() - (13 - index));
      const key = dayKey(date);
      return {
        date: key,
        label: date.toLocaleDateString("en-US", { month: "short", day: "numeric", timeZone: "UTC" }),
        count: dailyCounts.get(key) ?? 0,
      };
    });

    response.status(200).json({
      metrics: {
        total: total.count,
        newToday: today.count,
        newThisWeek: thisWeek.count,
        countriesTracked: countriesTracked.count,
      },
      daily,
      countries: countryRows,
      messages,
    });
  } catch (error) {
    request.log.error({ error }, "Unable to load admin dashboard");
    response.status(500).json({ message: "We couldn't load the admin dashboard. Please try again." });
  }
});

export default adminRouter;