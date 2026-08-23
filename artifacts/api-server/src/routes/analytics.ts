import crypto from "node:crypto";
import { Router } from "express";
import { db, visitorSessions } from "@workspace/db";

const analyticsRouter = Router();
const sessionIdPattern = /^[a-zA-Z0-9_-]{16,80}$/;
const trackedPagePaths = new Set(["/"]);
const VISIT_WINDOW_MS = 10 * 60 * 1000;
const MAX_VISITS_PER_WINDOW = 40;
const MAX_RATE_LIMIT_KEYS = 2_000;
const visitRateLimits = new Map<string, { count: number; windowStartedAt: number }>();

function cleanedPath(value: unknown) {
  if (typeof value !== "string") {
    return "";
  }

  const path = value.trim();
  return trackedPagePaths.has(path) ? path : "";
}

function rateLimitKey(request: { ip?: string }) {
  return crypto
    .createHash("sha256")
    .update(request.ip ?? "unknown")
    .digest("hex");
}

function pruneExpiredRateLimits(now: number) {
  for (const [key, value] of visitRateLimits) {
    if (now - value.windowStartedAt >= VISIT_WINDOW_MS) {
      visitRateLimits.delete(key);
    }
  }
}

function isRateLimited(request: { ip?: string }) {
  const key = rateLimitKey(request);
  const now = Date.now();
  pruneExpiredRateLimits(now);
  const current = visitRateLimits.get(key);

  if (current?.count && current.count >= MAX_VISITS_PER_WINDOW) {
    return true;
  }

  if (current) {
    current.count += 1;
    return false;
  }

  if (visitRateLimits.size >= MAX_RATE_LIMIT_KEYS) {
    const oldestKey = visitRateLimits.keys().next().value;
    if (oldestKey) visitRateLimits.delete(oldestKey);
  }

  visitRateLimits.set(key, { count: 1, windowStartedAt: now });
  return false;
}

analyticsRouter.post("/analytics/visit", async (request, response) => {
  const fetchSite = request.get("Sec-Fetch-Site");
  if (fetchSite === "cross-site" || fetchSite === "same-site") {
    response.status(403).json({ message: "Visit data must come from BeePod." });
    return;
  }

  if (isRateLimited(request)) {
    response.status(429).json({ message: "Too many visit events. Please try again later." });
    return;
  }

  const sessionId = request.body?.sessionId;
  const pagePath = cleanedPath(request.body?.pagePath);

  if (typeof sessionId !== "string" || !sessionIdPattern.test(sessionId) || !pagePath) {
    response.status(400).json({ message: "Invalid visit data." });
    return;
  }

  const sessionHash = crypto.createHash("sha256").update(sessionId).digest("hex");

  try {
    await db
      .insert(visitorSessions)
      .values({ sessionHash, pagePath, visitedOn: new Date().toISOString().slice(0, 10) })
      .onConflictDoNothing({
        target: [
          visitorSessions.sessionHash,
          visitorSessions.pagePath,
          visitorSessions.visitedOn,
        ],
      });

    response.status(204).end();
  } catch (error) {
    request.log.error({ error }, "Unable to save anonymous visit");
    response.status(500).json({ message: "Unable to save visit data." });
  }
});

export default analyticsRouter;