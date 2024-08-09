'use client';

import React from 'react';
import { Provider } from 'react-redux';
import { ThemeProvider } from '../components/ThemeProvider';
import store from '../store';
import Header from '../components/Header';
import '../style.css';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <ThemeProvider>
        <Provider store={store}>
          <body>
            <Header />
            <main>
              <h1>Planets</h1>
              {children}
            </main>
          </body>
        </Provider>
      </ThemeProvider>
    </html>
  );
}
