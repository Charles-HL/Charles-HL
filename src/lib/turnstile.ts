const VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

/** The captcha is enforced as soon as the secret key is configured. */
export const isTurnstileEnabled = () => Boolean(process.env.TURNSTILE_SECRET_KEY);

/** Server-side check of the token produced by the Cloudflare Turnstile widget. */
export async function verifyTurnstileToken(token: unknown, ip?: string): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true;
  if (typeof token !== "string" || token.length === 0 || token.length > 2048) return false;

  const params = new URLSearchParams({ secret, response: token });
  if (ip && ip !== "unknown") params.set("remoteip", ip);

  try {
    const response = await fetch(VERIFY_URL, {
      method: "POST",
      body: params,
      signal: AbortSignal.timeout(5000),
    });
    const result: { success?: boolean } = await response.json();
    return result.success === true;
  } catch {
    return false;
  }
}
