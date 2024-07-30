import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '../../../lib/prisma'; 
import corsMiddleware from '../../../lib/cors'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, async () => {
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
        res.status(500).json({ error: 'Failed to fetch book' });
      }
    } else if (req.method === 'PUT') {
      try {
        const { title, author, description } = req.body;
        const updatedBook = await prisma.book.update({
          where: { id: Number(id) },
          data: { title, author, description },
        });
        res.status(200).json(updatedBook);
      } catch (error) {
        res.status(500).json({ error: 'Failed to update book' });
      }
    } else if (req.method === 'DELETE') {
      try {
        await prisma.book.delete({
          where: { id: Number(id) },
        });
        res.status(204).end();
      } catch (error) {
        res.status(500).json({ error: 'Failed to delete book' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
};

export default handler;
