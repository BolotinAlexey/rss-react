import React from 'react';
import Link from 'next/link';
import { ThemeProvider } from '../components/ThemeProvider';

export default function NotFound() {
  return (
    <ThemeProvider>
      <section className="not-found">
        <h2 className="section__title">404 Not Found</h2>
        <Link href="/">Go Back</Link>
      </section>
    </ThemeProvider>
  );
}
