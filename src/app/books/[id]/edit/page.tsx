"use client"; // Ensure this is added at the top

import { FC, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation'; // Import from 'next/navigation'

const EditBook: FC = () => {
  const { id } = useParams() as { id?: string }; // Use type assertion
  const router = useRouter();
  
  const [book, setBook] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        if (id) {
          const response = await fetch(`/api/books/${id}`);
          if (response.ok) {
            const data = await response.json();
            setBook(data);
            setTitle(data.title);
            setAuthor(data.author);
            setDescription(data.description);
          } else {
            throw new Error('Failed to fetch book');
          }
        }
      } catch (error) {
        setError('Failed to fetch book');
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (id) {
        const response = await fetch(`/api/books/${id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, author, description }),
        });

        if (response.ok) {
          router.push('/');
        } else {
          throw new Error('Failed to update book');
        }
      }
    } catch (error) {
      setError('Failed to update book');
      console.error('Error updating book:', error);
    }
  };

  if (error) {
    return <p className="text-red-500 text-center">{error}</p>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-900">Edit Book</h1>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium text-gray-700">Title</label>
          <input
            id="title"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-lg font-medium text-gray-700">Author</label>
          <input
            id="author"
            type="text"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium text-gray-700">Description</label>
          <textarea
            id="description"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500 sm:text-sm"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            required
          />
        </div>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 transition-colors"
        >
          Update Book
        </button>
      </form>
    </div>
  );
};

export default EditBook;
