import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '../../lib/prisma'; 
import corsMiddleware from '../../lib/cors'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, async () => {
    if (req.method === 'GET') {
      try {
        const books = await prisma.book.findMany();
        res.status(200).json(books);
      } catch (error) {
        res.status(500).json({ error: 'Failed to fetch books' });
      }
    } else if (req.method === 'POST') {
      try {
        const { title, author, description } = req.body;
        const newBook = await prisma.book.create({
          data: { title, author, description },
        });
        res.status(201).json(newBook);
      } catch (error) {
        res.status(500).json({ error: 'Failed to create book' });
      }
    } else {
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${req.method} Not Allowed`);
    }
  });
};

export default handler;
