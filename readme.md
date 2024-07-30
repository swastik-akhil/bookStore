
---

# Next.js Bookstore Application

This is a bookstore application built with Next.js, Prisma, and Tailwind CSS. It allows users to view, add, edit, and delete books from the store.

## Features

- View all books
- View details of a single book
- Add a new book
- Edit a book
- Delete a book

## Technologies Used

- [Next.js](https://nextjs.org/)
- [Prisma](https://www.prisma.io/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vercel](https://vercel.com/) for deployment

## Getting Started

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/swastik-akhil/bookStore
   cd bookstore
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database:**

   Create a `.env` file in the root of your project and add your database connection string:

   ```env
   DATABASE_URL="your-database-connection-string"
   NEXT_PUBLIC_API_URL = http://localhost:3000
   ```

   **Run Prisma migrations:**

   ```bash
   npx prisma migrate dev --name init
   ```

   **Generate Prisma client:**

   ```bash
   npx prisma generate
   ```

4. **Run the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

   Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```plaintext
.
├── prisma
│   ├── schema.prisma        # Prisma schema
├── public                   # Public assets
├── src
│   ├── app
│   │   ├── books
│   │   │   ├── [id]
│   │   │   │   ├── edit
│   │   │   │   │   └── page.tsx   # Edit book page
│   │   │   │   └── page.tsx       # Book details page
│   │   │   ├── add
│   │   │   │   └── page.tsx       # Add new book page
│   │   │   └── page.tsx           # Books list page
│   ├── pages
│   │   ├── api
│   │   │   └── books
│   │   │       └── index.ts       # Books API handler
│   │   └── index.tsx              # Home page
│   └── styles
│       └── globals.css            # Global styles
├── .env                           # Environment variables
├── next.config.js                 # Next.js configuration
├── tailwind.config.js             # Tailwind CSS configuration
├── tsconfig.json                  # TypeScript configuration
└── package.json                   # Project dependencies and scripts
```

## API Endpoints

- **GET /api/books**: Retrieve all books
- **GET /api/books/[id]**: Retrieve a single book by ID
- **POST /api/books**: Add a new book
- **PUT /api/books/[id]**: Update a book by ID
- **DELETE /api/books/[id]**: Delete a book by ID

## Deployment

To deploy this project on Vercel, follow these steps:

1. Push your code to a GitHub repository.
2. Go to [Vercel](https://vercel.com/), sign in, and click on "New Project".
3. Import your repository.
4. Set the environment variables in Vercel dashboard.
5. Click "Deploy".

Make sure to run the `prisma generate` command during the build process. You can do this by adding a `vercel-build` script in your `package.json`:

```json
{
  "scripts": {
    "build": "next build",
    "vercel-build": "prisma generate && next build"
  }
}
```

---
