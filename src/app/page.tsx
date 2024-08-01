"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const HomePage = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // Loading state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const fetchBooks = async (page: number) => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await fetch(`/api/books?page=${page}&limit=3`);
        if (response.ok) {
          const data = await response.json();
          setBooks(data.books);
          setTotalPages(data.totalPages);
          setCurrentPage(data.currentPage);
        } else {
          throw new Error('Failed to fetch books');
        }
      } catch (error) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', error);
      } finally {
        setLoading(false); // Set loading to false when fetching completes
      }
    };

    fetchBooks(currentPage);
  }, [currentPage]);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (loading) return <p className="text-center text-lg font-medium mt-4">Loading Books...</p>;

  if (error) return <p className="text-red-500 text-center mt-4 text-lg font-medium">{error}</p>;

  return (
    <div className="container mx-auto p-6">
      <div className="text-center mb-8">
        <Link href="/books/add" legacyBehavior>
          <a className="inline-block px-8 py-3 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-full shadow-lg hover:from-teal-600 hover:to-teal-700 transition duration-700 text-lg font-semibold">
            Add Book
          </a>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {books.map((book) => (
          <div key={book.id} className="relative bg-white rounded-lg border border-gray-300 shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl group">
            <div className="absolute inset-0 bg-gradient-to-r from-teal-50 to-transparent opacity-20 group-hover:opacity-40 transition-opacity duration-700"></div>
            <div className="relative p-6 flex flex-col h-full">
              
              <h2 className="text-3xl font-extrabold mb-3 text-gray-900 tracking-tight">{book.title}</h2>
              <p className="text-gray-800 mb-4 text-lg italic">by {book.author}</p>
              <p className="text-gray-600 leading-relaxed text-base flex-grow">{book.description}</p>
              <Link href={`/books/${book.id}`} legacyBehavior>
                <a className="mt-auto text-teal-500 hover:text-teal-600 font-medium text-lg transition duration-300 group-hover:underline">
                  View Details
                </a>
              </Link>
              
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-center gap-4 mt-8">
        <button
          onClick={handlePreviousPage}
          disabled={currentPage === 1}
          className="px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-full shadow-sm hover:from-gray-400 hover:to-gray-500 transition duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={currentPage === totalPages}
          className="px-6 py-3 bg-gradient-to-r from-gray-300 to-gray-400 text-gray-800 rounded-full shadow-sm hover:from-gray-400 hover:to-gray-500 transition duration-300 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
