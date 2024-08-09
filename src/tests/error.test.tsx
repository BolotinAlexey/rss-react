import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { useRouter } from 'next/navigation';
import ErrorNext from '../app/error';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
}));

describe('Error Component', () => {
  it('should render error message and button', () => {
    const mockPush = vi.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const mockError = new Error('Test error');

    render(<ErrorNext error={mockError} />);

    expect(screen.getByText('Something went wrong!')).toBeInTheDocument();

    expect(screen.getByText('Come Back')).toBeInTheDocument();
  });

  it('should log the error to the console', () => {
    const consoleError = vi
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    const mockPush = vi.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const mockError = new Error('Test error');

    render(<ErrorNext error={mockError} />);

    expect(consoleError).toHaveBeenCalledWith(mockError);

    consoleError.mockRestore();
  });

  it('should redirect to the correct path when "Come Back" button is clicked', () => {
    const mockPush = vi.fn();
    (useRouter as unknown as jest.Mock).mockReturnValue({
      push: mockPush,
    });

    const mockError = new Error('Test error');

    render(<ErrorNext error={mockError} />);

    fireEvent.click(screen.getByText('Come Back'));

    expect(mockPush).toHaveBeenCalledWith('/?page=1&search=');
  });
});
