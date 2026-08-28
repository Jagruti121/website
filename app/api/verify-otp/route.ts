import { NextResponse } from 'next/server';
import { otpStore } from '@/lib/otp-store';

export async function POST(request: Request) {
  try {
    const { email, otp } = await request.json();

    if (!email || !otp) {
      return NextResponse.json({ success: false, error: 'Email and OTP are required' }, { status: 400 });
    }

    const stored = otpStore.get(email.toLowerCase());

    if (!stored) {
      return NextResponse.json(
        { success: false, error: 'No OTP found for this email. Please request a new one.' },
        { status: 400 }
      );
    }

    if (Date.now() > stored.expiresAt) {
      otpStore.delete(email.toLowerCase());
      return NextResponse.json(
        { success: false, error: 'OTP has expired. Please request a new one.' },
        { status: 400 }
      );
    }

    if (stored.otp !== otp.trim()) {
      return NextResponse.json(
        { success: false, error: 'Incorrect OTP. Please try again.' },
        { status: 400 }
      );
    }

    otpStore.delete(email.toLowerCase());

    return NextResponse.json({ success: true, message: 'Email verified successfully' });
  } catch {
    return NextResponse.json({ success: false, error: 'Verification failed' }, { status: 500 });
  }
}
