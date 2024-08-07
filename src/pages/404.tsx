import React from 'react';
import Link from 'next/link';
import { ThemeProvider } from '../components/ThemeProvider';

export default function NotFound() {
  return (
    <ThemeProvider>
      <section className="not-found">
        <h2 className="section__title">404 Not Found</h2>
        <Link href="/" className="text-red-800 text-3xl">
          Go Back
        </Link>
      </section>
    </ThemeProvider>
  );
}
