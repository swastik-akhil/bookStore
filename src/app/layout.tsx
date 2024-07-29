"use client"; // This directive tells Next.js that this is a Client Component

import { FC, ReactNode } from 'react';
import '../styles/globals.css';
import Header from '../components/Header'; // Adjust the path as necessary


const RootLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <html lang="en">
      <head>
        <title>Next.js Bookstore</title>
      </head>
      <body className="min-h-screen bg-gray-100 p-4">
        <header className="bg-white shadow">
          {/* <div className="mx-auto p-4 bg-orange-200">
            <h1 className="text-2xl font-bold text-center">Next.js Bookstore</h1>
          </div> */}
          <Header />
        </header>
        <main className="container mx-auto mt-4">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
