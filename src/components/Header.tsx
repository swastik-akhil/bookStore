import React, { FC } from 'react';
import Link from 'next/link';

const Header: FC = () => {
  return (
    <Link href="/" className="block mx-auto p-4 bg-teal-300 relative">
      <div className="text-2xl font-bold text-center">
        Next.js Bookstore
      </div>
    </Link>
  );
};

export default Header;
