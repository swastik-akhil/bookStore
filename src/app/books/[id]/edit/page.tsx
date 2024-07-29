"use client"; // Ensure this is added at the top

import { FC, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; // Adjusted import

const EditBook: FC = () => {
  const router = useRouter();
  const { id } = useParams(); // Use useParams to get dynamic route parameters
  const [book, setBook] = useState<any>(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return; // Skip fetching if id is not available

    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
          setTitle(data.title);
          setAuthor(data.author);
          setDescription(data.description);
        } else {
          throw new Error('Failed to fetch book details');
        }
      } catch (error) {
        setError('Failed to fetch book details');
        console.error('Error fetching book:', error);
      }
    };

    fetchBook();
  }, [id]);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, author, description }),
      });
      if (response.ok) {
        router.push(`/books/${id}`);
      } else {
        throw new Error('Failed to update book');
      }
    } catch (error) {
      setError('Failed to update book');
      console.error('Error updating book:', error);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/'); // Redirect to the homepage or list page
      } else {
        throw new Error('Failed to delete book');
      }
    } catch (error) {
      setError('Failed to delete book');
      console.error('Error deleting book:', error);
    }
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!book) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-2xl font-bold">Edit Book</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-lg">Title</label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="author" className="block text-lg">Author</label>
          <input
            id="author"
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="border px-3 py-2 w-full"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-lg">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border px-3 py-2 w-full"
          />
        </div>
        <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded-md">Update Book</button>
      </form>
      <button onClick={handleDelete} className="mt-4 px-4 py-2 bg-red-600 text-white rounded-md">Delete Book</button>
    </div>
  );
};

export default EditBook;
