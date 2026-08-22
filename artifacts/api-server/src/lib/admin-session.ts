import crypto from "node:crypto";
import type { NextFunction, Request, Response } from "express";

const COOKIE_NAME = "beepod_admin_session";
const SESSION_LIFETIME_MS = 1000 * 60 * 60 * 8;

function signingSecret() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) {
    throw new Error("SESSION_SECRET must be configured for admin sessions");
  }

  return secret;
}

function sign(value: string) {
  return crypto.createHmac("sha256", signingSecret()).update(value).digest("hex");
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);

  return (
    leftBuffer.length === rightBuffer.length &&
    crypto.timingSafeEqual(leftBuffer, rightBuffer)
  );
}

export function verifyAdminPassword(password: unknown) {
  const configuredPassword = process.env.ADMIN_PASSWORD;
  if (typeof password !== "string" || !configuredPassword) {
    return false;
  }

  return safeEqual(password, configuredPassword);
}

export function createAdminSession(response: Response) {
  const expiresAt = Date.now() + SESSION_LIFETIME_MS;
  const payload = `v1.${expiresAt}`;
  const token = `${payload}.${sign(payload)}`;

  response.cookie(COOKIE_NAME, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_LIFETIME_MS,
    path: "/",
  });
}

export function clearAdminSession(response: Response) {
  response.clearCookie(COOKIE_NAME, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
  });
}

export function hasAdminSession(request: Request) {
  const token = request.cookies?.[COOKIE_NAME];
  if (typeof token !== "string") {
    return false;
  }

  const [version, expiryString, signature, ...unexpectedParts] = token.split(".");
  const payload = `${version}.${expiryString}`;
  const expiresAt = Number(expiryString);

  return (
    unexpectedParts.length === 0 &&
    version === "v1" &&
    Number.isFinite(expiresAt) &&
    expiresAt > Date.now() &&
    typeof signature === "string" &&
    safeEqual(signature, sign(payload))
  );
}

export function requireAdmin(request: Request, response: Response, next: NextFunction) {
  if (!hasAdminSession(request)) {
    response.status(401).json({ message: "Sign in is required to access the admin dashboard." });
    return;
  }

  next();
}