import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import CloseDetailsButton from './CloseDetailsButton';

interface MockRouter {
  query: Record<string, string>;
  push: (path: string) => void;
}

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

describe('CloseDetailsButton component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the button with correct text', () => {
    const mockRouter: MockRouter = {
      query: {},
      push: vi.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<CloseDetailsButton />);
    const button = screen.getByText('Hide details');
    expect(button).toBeInTheDocument();
  });

  it('should call navigate with the correct path when button is clicked', () => {
    const mockPush = vi.fn();
    (useRouter as unknown as Mock).mockReturnValue({
      query: { page: '1', search: 'test' },
      push: mockPush,
    });

    render(<CloseDetailsButton />);
    fireEvent.click(screen.getByText('Hide details'));

    expect(mockPush).toHaveBeenCalledWith('/?page=1&search=test');
  });

  it('should handle empty query', () => {
    const mockRouter: MockRouter = {
      query: {},
      push: vi.fn(),
    };

    (useRouter as jest.Mock).mockReturnValue(mockRouter);

    render(<CloseDetailsButton />);
    const button = screen.getByText('Hide details');
    fireEvent.click(button);

    expect(mockRouter.push).toHaveBeenCalledWith('/?');
  });
});
