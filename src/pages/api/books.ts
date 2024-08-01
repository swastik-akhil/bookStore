import { NextApiRequest, NextApiResponse } from 'next';
import {prisma} from '../../lib/prisma'; 
import corsMiddleware from '../../lib/cors'; 

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await corsMiddleware(req, res, async () => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 3;
    const skip = (page - 1) * limit;

    if (req.method === 'GET') {
      try {
        const books = await prisma.book.findMany({
          skip: skip,
          take: limit,
        });
        const totalBooks = await prisma.book.count();
        const totalPages = Math.ceil(totalBooks / limit);
        
        res.status(200).json({
          books,
          totalBooks,
          totalPages,
          currentPage: page,
        });
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
