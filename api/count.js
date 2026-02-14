import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method === "POST") {
    const newCount = await kv.incr("script_copies");
    return res.status(200).json({ count: newCount });
  }

  if (req.method === "GET") {
    const count = await kv.get("script_copies") || 0;
    return res.status(200).json({ count });
  }

  res.status(405).end();
                                 }
