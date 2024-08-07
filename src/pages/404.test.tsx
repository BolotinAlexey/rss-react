import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import NotFound from './404';

// Mock ThemeProvider to avoid any potential issues with it in tests
vi.mock('../components/ThemeProvider', () => ({
  __esModule: true,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

describe('404 page', () => {
  it('should render 404 Not Found page correctly', () => {
    render(<NotFound />);

    expect(screen.getByText('404 Not Found')).toBeInTheDocument();

    const linkElement = screen.getByText('Go Back');
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest('a')).toHaveAttribute('href', '/');
  });
});
