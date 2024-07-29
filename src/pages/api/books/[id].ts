import type { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../lib/prisma';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const book = await prisma.book.findUnique({
        where: { id: Number(id) },
      });
      if (book) {
        res.status(200).json(book);
      } else {
        res.status(404).json({ error: 'Book not found' });
      }
    } catch (error) {
      console.error('Error fetching book:', error);
      res.status(500).json({ error: 'Failed to fetch book' });
    }
  } else if (req.method === 'PUT') {
    try {
      const { title, author, description } = req.body;
      const book = await prisma.book.update({
        where: { id: Number(id) },
        data: { title, author, description },
      });
      res.status(200).json(book);
    } catch (error) {
      console.error('Error updating book:', error);
      res.status(500).json({ error: 'Failed to update book' });
    }
  } else if (req.method === 'DELETE') {
    try {
      const book = await prisma.book.delete({
        where: { id: Number(id) },
      });
      res.status(200).json(book);
    } catch (error) {
      console.error('Error deleting book:', error);
      res.status(500).json({ error: 'Failed to delete book' });
    }
  } else {
    res.status(405).end(); // Method Not Allowed
  }
};
