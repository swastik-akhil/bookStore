import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const books = await prisma.book.findMany();
      res.status(200).json(books);
    } catch (error) {
      console.error('Error fetching books:', error);
      res.status(500).json({ error: 'Failed to fetch books' });
    }
  } else if (req.method === 'POST') {
    try {
      const { title, author, description } = req.body;
      const book = await prisma.book.create({
        data: { title, author, description },
      });
      res.status(201).json(book);
    } catch (error) {
      console.error('Error adding book:', error);
      res.status(500).json({ error: 'Failed to add book' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
