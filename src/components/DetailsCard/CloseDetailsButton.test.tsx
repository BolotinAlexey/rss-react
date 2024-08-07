import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import CloseDetailsButton from './CloseDetailsButton';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';

vi.mock('../../utils/setNewPathWithoutDetails', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

const mockPush = vi.fn();

const mockRouter = {
  pathname: '/current-page',
  query: {
    page: '1',
    search: 'test',
    details: '123',
  },
  push: mockPush,
};

describe('CloseDetailsButton', () => {
  it('should render the button with correct text', () => {
    (useRouter as Mock).mockReturnValue(mockRouter);

    render(<CloseDetailsButton />);
    const button = screen.getByText('Hide details');
    expect(button).toBeInTheDocument();
  });

  it('should call setNewPathWithoutDetails and push new path on button click', () => {
    (useRouter as unknown as Mock).mockReturnValue(mockRouter);

    const newPathWithoutDetails = {
      pathname: '/current-page',
      query: {
        page: '1',
        search: 'test',
      },
    };
    (setNewPathWithoutDetails as unknown as Mock).mockReturnValue(
      newPathWithoutDetails
    );

    render(<CloseDetailsButton />);

    fireEvent.click(screen.getByText('Hide details'));

    expect(setNewPathWithoutDetails).toHaveBeenCalledWith(mockRouter);
    expect(mockPush).toHaveBeenCalledWith(newPathWithoutDetails);
  });
});
