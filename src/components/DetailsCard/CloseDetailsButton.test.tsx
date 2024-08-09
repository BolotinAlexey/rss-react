import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter, useSearchParams } from 'next/navigation';
import CloseDetailsButton from './CloseDetailsButton';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';

vi.mock('../../utils/setNewPathWithoutDetails', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

describe('CloseDetailsButton', () => {
  const mockPush = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();

    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as Mock).mockReturnValue({
      get: (key: 'page' | 'search' | 'details') => {
        const params: Record<'page' | 'search' | 'details', string> = {
          page: '1',
          search: 'test',
          details: '123',
        };
        return params[key];
      },
    });
  });

  it('should render the button with correct text', () => {
    render(<CloseDetailsButton />);
    const button = screen.getByText('Hide details');
    expect(button).toBeInTheDocument();
  });

  it('should call setNewPathWithoutDetails and push new path on button click', () => {
    const newPathWithoutDetails = '/?page=1&search=test';
    (setNewPathWithoutDetails as Mock).mockReturnValue(newPathWithoutDetails);

    render(<CloseDetailsButton />);

    fireEvent.click(screen.getByText('Hide details'));

    expect(setNewPathWithoutDetails).toHaveBeenCalledWith(expect.any(Object));
    expect(mockPush).toHaveBeenCalledWith(newPathWithoutDetails);
  });
});
