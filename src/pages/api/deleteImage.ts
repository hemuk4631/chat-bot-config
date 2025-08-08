// pages/api/deleteImage.ts
import { v2 as cloudinary } from 'cloudinary';
import type { NextApiRequest, NextApiResponse } from 'next';

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'DELETE') {
    return res.status(405).json({ message: 'Method not allowed'});
  }

  const { public_id } = req.body;

  if (!public_id) {
    return res.status(400).json({ message: 'Missing public_id' });
  }

  try {
    const result = await cloudinary.uploader.destroy(public_id);
    return res.status(200).json({ result });
  } catch (error) {
    console.error('Delete error:', error);
    return res.status(500).json({ message: 'Delete failed', error });
  }
}
