"use client"; 

import { FC, useEffect, useState } from 'react';
import Link from 'next/link';

const HomePage: FC = () => {
  const [books, setBooks] = useState<any[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('/api/books');
        if (response.ok) {
          const data = await response.json();
          setBooks(data);
          setFilteredBooks(data); // Initialize filteredBooks with all books
        } else {
          throw new Error('Failed to fetch books');
        }
      } catch (error) {
        setError('Failed to fetch books');
        console.error('Error fetching books:', error);
      }
    };

    fetchBooks();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const lowercasedSearchTerm = searchTerm.toLowerCase();
      const filtered = books.filter(book =>
        book.title.toLowerCase().includes(lowercasedSearchTerm) ||
        book.author.toLowerCase().includes(lowercasedSearchTerm)
      );
      setFilteredBooks(filtered);
    } else {
      setFilteredBooks(books);
    }
  }, [searchTerm, books]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <header className="text-center mb-8">
        {/* <div className="mx-auto p-4 bg-orange-200"> */}
          {/* <Link href="/" className="block text-2xl font-bold text-center text-gray-800">
            Next.js Bookstore
          </Link> */}
        {/* </div> */}
        <h1 className="text-4xl font-extrabold text-gray-900">Welcome to the Bookstore</h1>
        <p className="mt-2 text-xl text-gray-600">Explore our collection of books</p>
        <Link href="/books/add" className="mt-4 inline-block px-6 py-3 bg-green-600 text-white font-semibold rounded-md shadow-md hover:bg-green-700 transition-colors">
          Add New Book
        </Link>
      </header>

      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by title or author"
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {error && <p className="text-red-500 text-center">{error}</p>}
      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map(book => (
          <li key={book.id} className="bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden transition-transform transform hover:scale-105">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800">{book.title}</h2>
              <p className="mt-1 text-lg text-gray-600">by {book.author}</p>
              <p className="mt-2 text-gray-700">{book.description}</p>
              <Link href={`/books/${book.id}`} className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                View Details
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
