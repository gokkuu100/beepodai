import { desc, ilike, or } from "drizzle-orm";
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

function dayKey(value: Date) {
  return value.toISOString().slice(0, 10);
}

function startOfUtcDay(value: Date) {
  return new Date(Date.UTC(value.getUTCFullYear(), value.getUTCMonth(), value.getUTCDate()));
}

adminRouter.post("/admin/login", (request, response) => {
  if (!process.env.ADMIN_PASSWORD) {
    response.status(503).json({
      message: "Admin sign-in is not configured yet. Add ADMIN_PASSWORD in Secrets.",
    });
    return;
  }

  if (!verifyAdminPassword(request.body?.password)) {
    response.status(401).json({ message: "That password isn't correct." });
    return;
  }

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

  try {
    const [allPreorders, messages] = await Promise.all([
      db
        .select({
          createdAt: preorders.createdAt,
          country: preorders.country,
        })
        .from(preorders),
      searchFilter
        ? db
            .select()
            .from(preorders)
            .where(searchFilter)
            .orderBy(desc(preorders.createdAt))
            .limit(250)
        : db.select().from(preorders).orderBy(desc(preorders.createdAt)).limit(250),
    ]);

    const now = new Date();
    const todayStart = startOfUtcDay(now);
    const weekStart = new Date(todayStart);
    weekStart.setUTCDate(weekStart.getUTCDate() - 6);

    const dailyCounts = new Map<string, number>();
    const countryCounts = new Map<string, number>();
    let newToday = 0;
    let newThisWeek = 0;

    for (const preorder of allPreorders) {
      const createdAt = preorder.createdAt;
      if (!createdAt) {
        continue;
      }

      if (createdAt >= todayStart) {
        newToday += 1;
      }
      if (createdAt >= weekStart) {
        newThisWeek += 1;
      }

      const key = dayKey(createdAt);
      dailyCounts.set(key, (dailyCounts.get(key) ?? 0) + 1);

      const country = preorder.country?.trim() || "Not provided";
      countryCounts.set(country, (countryCounts.get(country) ?? 0) + 1);
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

    const countries = Array.from(countryCounts, ([country, count]) => ({ country, count }))
      .sort((left, right) => right.count - left.count || left.country.localeCompare(right.country))
      .slice(0, 6);

    response.status(200).json({
      metrics: {
        total: allPreorders.length,
        newToday,
        newThisWeek,
        countriesTracked: countryCounts.size,
      },
      daily,
      countries,
      messages,
    });
  } catch (error) {
    request.log.error({ error }, "Unable to load admin dashboard");
    response.status(500).json({ message: "We couldn't load the admin dashboard. Please try again." });
  }
});

export default adminRouter;