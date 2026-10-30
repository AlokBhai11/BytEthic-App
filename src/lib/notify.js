// Sends an email alert for a new enquiry. Silently skipped if Resend is not configured.
export async function notifyEnquiry(e) {
  const { RESEND_API_KEY, NOTIFY_EMAIL } = process.env;
  if (!RESEND_API_KEY || !NOTIFY_EMAIL) return;
  await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from: 'BytEthic <onboarding@resend.dev>',
      to: [NOTIFY_EMAIL],
      reply_to: e.email,
      subject: `New enquiry from ${e.name}`,
      text: `Name: ${e.name}\nEmail: ${e.email}\nServices: ${e.services.join(', ') || '-'}\nBudget: ${e.budget ?? '-'}\n\n${e.message}`,
    }),
  });
}
