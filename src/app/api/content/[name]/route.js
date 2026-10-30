import { defaults } from '@/lib/content';
import { getDb } from '@/lib/db';
import { fail, json } from '@/lib/http';

export const dynamic = 'force-dynamic';

// Public: /api/content/services and /api/content/projects
export async function GET(_req, { params }) {
  const { name } = await params;
  if (!defaults[name]) return fail('Unknown content.', 404);
  try {
    const rows = await (await getDb()).collection(name).find({ published: { $ne: false } }).sort({ order: 1 }).toArray();
    if (rows.length) return json(rows.map(({ _id, ...r }) => ({ id: String(_id), ...r })));
  } catch { /* fall through to defaults */ }
  return json(defaults[name]);
}
