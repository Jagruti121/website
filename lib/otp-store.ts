/**
 * In-memory OTP store — shared between send-otp and verify-otp route handlers.
 * Resets on server restart (fine for demo). Use Redis + TTL for production.
 */
export const otpStore = new Map<string, { otp: string; expiresAt: number }>();
