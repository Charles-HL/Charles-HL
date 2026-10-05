import { NextRequest } from "next/server";
import nodemailer from "nodemailer";
import { verifyTurnstileToken } from "@/lib/turnstile";
import type { Locale } from "@/lib/validation-messages";

/** Shared plumbing of the `/api/contact` and `/api/quote` mail routes. */

export const getLocaleFromRequest = (
  request: NextRequest,
  body?: Record<string, unknown>
): Locale => {
  if (body?.locale === "fr" || body?.locale === "en") {
    return body.locale;
  }
  // The forms always send their locale; French is the site default.
  return request.headers.get("accept-language")?.startsWith("en") ? "en" : "fr";
};

/** Server-only: the app password is read from the environment, never sent to the browser. */
export const createTransporter = () =>
  nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });

export const isSmtpConfigured = () =>
  Boolean(process.env.SMTP_EMAIL && process.env.SMTP_PASSWORD && process.env.TO_EMAIL);

/** A single address: no whitespace, comma, semicolon, quote or bracket (no extra recipient in Reply-To). */
const EMAIL_PATTERN = /^[^\s@,;<>()"']+@[^\s@,;<>()"']+\.[^\s@,;<>()"']+$/;

export const isValidEmail = (value: string) => EMAIL_PATTERN.test(value);

/** Collapses line breaks so a value can never inject a mail header. */
export const singleLine = (value: string) => value.replace(/[\r\n\u2028\u2029]+/g, " ").trim();

/** Hidden anti-spam field: real visitors never fill it. */
export const HONEYPOT_FIELD = "website";

export const isHoneypotFilled = (body: unknown) =>
  typeof body === "object" &&
  body !== null &&
  typeof (body as Record<string, unknown>)[HONEYPOT_FIELD] === "string" &&
  ((body as Record<string, unknown>)[HONEYPOT_FIELD] as string).trim().length > 0;

const RATE_LIMIT_MAX = 5;
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const hits = new Map<string, number[]>();

/**
 * Best-effort limit per client IP (memory of the running instance): it stops a
 * script from emptying the Gmail quota, without needing external storage.
 */
export const getClientIp = (request: NextRequest) =>
  request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
  request.headers.get("x-real-ip") ||
  "unknown";

export const isRateLimited = (request: NextRequest, now = Date.now()) => {
  const ip = getClientIp(request);
  const recent = (hits.get(ip) ?? []).filter((time) => now - time < RATE_LIMIT_WINDOW_MS);

  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);

  // Keeps the map small on a long-lived instance.
  if (hits.size > 1000) {
    for (const [key, times] of hits) {
      if (times.every((time) => now - time >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
};

/** Turnstile token sent by the form next to its fields (`turnstileToken`). */
export const hasValidCaptcha = (request: NextRequest, body: unknown) =>
  verifyTurnstileToken(
    typeof body === "object" && body !== null
      ? (body as Record<string, unknown>).turnstileToken
      : undefined,
    getClientIp(request)
  );
