import { ObjectId } from 'mongodb';
import { getDb } from '@/lib/db';
import { fail, isAdmin, json } from '@/lib/http';
import { STATUSES } from '@/lib/validate';

export const dynamic = 'force-dynamic';

// Admin: update an enquiry's status
export async function PATCH(req, { params }) {
  if (!isAdmin(req)) return fail('Unauthorized.', 401);
  const { id } = await params;
  if (!ObjectId.isValid(id)) return fail('Invalid id.');
  const { status } = (await req.json().catch(() => null)) ?? {};
  if (!STATUSES.includes(status)) return fail('Invalid status.');
  const r = await (await getDb()).collection('enquiries').updateOne({ _id: new ObjectId(id) }, { $set: { status } });
  return r.matchedCount ? json({ ok: true }) : fail('Not found.', 404);
}
