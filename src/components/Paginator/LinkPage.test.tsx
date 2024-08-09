import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter, useSearchParams } from 'next/navigation';
import LinkPage from './LinkPage';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('LinkPage', () => {
  it('should navigate to the correct page on button click', () => {
    const mockPush = vi.fn();
    const mockQuery = {
      get: vi.fn().mockImplementation((key) => {
        if (key === 'search') return 'test';
        if (key === 'page') return '1';
        return null;
      }),
    };

    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as Mock).mockReturnValue(mockQuery);

    render(<LinkPage page={2} />);

    fireEvent.click(screen.getByText('2'));

    expect(mockPush).toHaveBeenCalledWith('?page=2&search=test');
  });

  it('should have the active-page class when page matches the current query', () => {
    const mockQuery = {
      get: vi.fn().mockImplementation((key) => {
        if (key === 'page') return '2';
        return null;
      }),
    };

    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
    });

    (useSearchParams as Mock).mockReturnValue(mockQuery);

    render(<LinkPage page={2} />);

    const button = screen.getByText('2');
    expect(button).toHaveClass('paginator__link active-page');
  });

  it('should not have the active-page class when page does not match the current query', () => {
    const mockQuery = {
      get: vi.fn().mockImplementation((key) => {
        if (key === 'page') return '1';
        return null;
      }),
    };

    (useRouter as Mock).mockReturnValue({
      push: vi.fn(),
    });

    (useSearchParams as Mock).mockReturnValue(mockQuery);

    render(<LinkPage page={2} />);

    const button = screen.getByText('2');
    expect(button).toHaveClass('paginator__link');
    expect(button).not.toHaveClass('active-page');
  });
});
