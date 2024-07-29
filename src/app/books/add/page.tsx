"use client"; // Ensure this is added at the top

import { FC, useState } from 'react';
import { useRouter } from 'next/navigation';

const AddBook: FC = () => {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch('/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, description }),
      });
      if (response.ok) {
        router.push('/');
      } else {
        throw new Error('Failed to add book');
      }
    } catch (error) {
      setError('Failed to add book');
      console.error('Error adding book:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Add New Book</h1>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg font-medium">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-lg font-medium">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg font-medium">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full rounded-md"
            required
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;
