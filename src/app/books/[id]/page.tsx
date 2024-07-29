"use client";

import { FC, useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation'; 

const BookDetails: FC = () => {
  const router = useRouter();
  const { id } = useParams() as { id?: string }; 
  const [book, setBook] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchBook = async () => {
      try {
        const response = await fetch(`/api/books/${id}`);
        if (response.ok) {
          const data = await response.json();
          setBook(data);
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

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this book?')) return;

    try {
      const response = await fetch(`/api/books/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        router.push('/');
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
    <div className="max-w-md mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">{book.title}</h1>
      <p className="text-lg text-gray-700">by {book.author}</p>
      <p className="mt-2">{book.description}</p>
      <div className="mt-4">
        <button onClick={() => router.push(`/books/${id}/edit`)} className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Edit Book</button>
        <button onClick={handleDelete} className="ml-4 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">Delete Book</button>
      </div>
    </div>
  );
};

export default BookDetails;
