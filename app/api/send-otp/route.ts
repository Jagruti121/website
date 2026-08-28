import { NextResponse } from 'next/server';
import { otpStore } from '@/lib/otp-store';

function generateOtp(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    const otp = generateOtp();
    const expiresAt = Date.now() + 10 * 60 * 1000; // 10 minutes

    otpStore.set(email.toLowerCase(), { otp, expiresAt });

    // In production: send via Resend / SendGrid / Nodemailer
    console.info(`[OTP] Generated for ${email}: ${otp} (expires ${new Date(expiresAt).toISOString()})`);

    const isDev = process.env.NODE_ENV === 'development';

    return NextResponse.json({
      success: true,
      message: 'OTP sent to your email address',
      ...(isDev ? { devOtp: otp } : {})
    });
  } catch {
    return NextResponse.json({ success: false, error: 'Failed to send OTP' }, { status: 500 });
  }
}
