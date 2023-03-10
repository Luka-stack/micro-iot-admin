// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' });
  }

  try {
    await res.revalidate('/machines/4c48d884-b055-11ed-afa1');
    return res.json({ revalidated: true });
  } catch (err) {
    console.log(err);

    return res.status(500).send('Error revalidating');
  }
}
