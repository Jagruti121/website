'use server';

import { z } from 'zod';

const leadSchema = z.object({
  firstName: z.string().min(2, 'First name must be at least 2 characters'),
  lastName: z.string().min(2, 'Last name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email address'),
  institution: z.string().min(3, 'Institution name is required'),
  teamSize: z.enum(['1-10', '11-50', '51-200', '200+'], {
    message: 'Please select your team size'
  }),
  useCases: z.array(z.string()).min(1, 'Please select at least one use case'),
  timeline: z.enum(['immediately', '1-3months', '3-6months', 'exploring'], {
    message: 'Please select your timeline'
  }),
  message: z.string().optional()
});

export type LeadFormData = z.infer<typeof leadSchema>;

export type LeadCaptureResult =
  | { success: true; message: string }
  | { success: false; error: string };

export async function submitLeadCapture(data: LeadFormData): Promise<LeadCaptureResult> {
  const parsed = leadSchema.safeParse(data);
  if (!parsed.success) {
    const firstError = parsed.error.issues[0];
    return { success: false, error: firstError?.message ?? 'Invalid form data' };
  }

  const lead = parsed.data;

  try {
    const webhookUrl = process.env.WEBHOOK_URL;
    if (webhookUrl) {
      const payload = {
        event: 'pws_demo_request',
        timestamp: new Date().toISOString(),
        lead: {
          name: `${lead.firstName} ${lead.lastName}`,
          email: lead.email,
          institution: lead.institution,
          teamSize: lead.teamSize,
          useCases: lead.useCases,
          timeline: lead.timeline,
          message: lead.message ?? ''
        }
      };

      const webhookResponse = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(5000)
      });

      if (!webhookResponse.ok) {
        console.error('[LeadCapture] Webhook returned non-OK status:', webhookResponse.status);
      }
    }

    console.info('[LeadCapture] New PWS demo request from:', lead.email);

    return {
      success: true,
      message: `Thank you, ${lead.firstName}! We've received your request and will be in touch within 24 hours.`
    };
  } catch (err) {
    console.error('[LeadCapture] Error processing lead:', err);
    return {
      success: false,
      error: 'Something went wrong on our end. Please try again or email us at hello@nextsolves.com'
    };
  }
}
