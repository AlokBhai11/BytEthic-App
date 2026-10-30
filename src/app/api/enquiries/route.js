import { getDb } from '@/lib/db';
import { fail, isAdmin, json } from '@/lib/http';
import { notifyEnquiry } from '@/lib/notify';
import { STATUSES, enquirySchema } from '@/lib/validate';

export const dynamic = 'force-dynamic';

// Public: the app submits a project enquiry
export async function POST(req) {
  const body = await req.json().catch(() => null);
  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) return fail(parsed.error.issues[0].message);
  const data = parsed.data;
  try {
    const col = (await getDb()).collection('enquiries');
    // Spam guard: max 3 enquiries per email per hour
    const recent = await col.countDocuments({ email: data.email, createdAt: { $gte: new Date(Date.now() - 3600_000) } });
    if (recent >= 3) return fail('Too many enquiries from this email. Please try again later.', 429);
    const doc = { ...data, status: 'new', createdAt: new Date() };
    const { insertedId } = await col.insertOne(doc);
    try { await notifyEnquiry(doc); } catch { /* alert failure must not fail the request */ }
    return json({ id: String(insertedId) }, 201);
  } catch {
    return fail('Server error. Please try again.', 500);
  }
}

// Admin: list enquiries (header: x-admin-key). Optional ?status=new|contacted|won|closed
export async function GET(req) {
  if (!isAdmin(req)) return fail('Unauthorized.', 401);
  const status = new URL(req.url).searchParams.get('status');
  const filter = STATUSES.includes(status) ? { status } : {};
  const rows = await (await getDb()).collection('enquiries').find(filter).sort({ createdAt: -1 }).limit(100).toArray();
  return json(rows);
}
