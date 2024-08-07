import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import LinkPage from './LinkPage';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('LinkPage', () => {
  it('should navigate to the correct page on button click', () => {
    const mockPush = vi.fn();
    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: { page: '1' },
      push: mockPush,
    });

    render(<LinkPage page={2} />);

    fireEvent.click(screen.getByText('2'));

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { page: 2 },
    });
  });

  it('should have the active-page class when page matches the current query', () => {
    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: { page: '2' },
      push: vi.fn(),
    });

    render(<LinkPage page={2} />);

    const button = screen.getByText('2');
    expect(button).toHaveClass('paginator__link active-page');
  });

  it('should not have the active-page class when page does not match the current query', () => {
    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: { page: '1' },
      push: vi.fn(),
    });

    render(<LinkPage page={2} />);

    const button = screen.getByText('2');
    expect(button).toHaveClass('paginator__link');
  });
});
