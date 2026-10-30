import { getDb } from '@/lib/db';
import { json } from '@/lib/http';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await (await getDb()).command({ ping: 1 });
    return json({ ok: true, db: 'connected' });
  } catch {
    return json({ ok: false, db: 'unreachable' }, 503);
  }
}
