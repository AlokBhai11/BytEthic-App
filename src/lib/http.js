import { timingSafeEqual } from 'node:crypto';
import { NextResponse } from 'next/server';

export const json = (data, status = 200) => NextResponse.json(data, { status });
export const fail = (error, status = 400) => json({ error }, status);

export function isAdmin(req) {
  const key = process.env.ADMIN_API_KEY || '';
  const sent = req.headers.get('x-admin-key') || '';
  return key.length >= 16 && sent.length === key.length && timingSafeEqual(Buffer.from(sent), Buffer.from(key));
}
