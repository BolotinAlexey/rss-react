import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import useLS from '../../hooks/useLS';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import FormSearch from './FormSearch';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../hooks/useLS', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../../utils/setNewPathWithoutDetails', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('FormSearch', () => {
  it('should update input value on change', () => {
    const mockSetName = vi.fn();
    (useLS as Mock).mockReturnValue(['', mockSetName, vi.fn()]);

    render(<FormSearch />);

    const input = screen.getByPlaceholderText('Enter name');
    fireEvent.change(input, { target: { value: 'Tatooine' } });

    expect(mockSetName).toHaveBeenCalledWith('tatooine');
  });

  it('should navigate and dispatch action on form submit with details query', async () => {
    const mockPush = vi.fn();
    const mockDispatch = vi.fn();
    const mockSaveNameToLocalStorage = vi.fn();
    const mockSetNewPathWithoutDetails = {
      pathname: '/',
      query: { page: '1', search: '' },
    };

    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: { details: '123' },
      push: mockPush,
    });

    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useLS as Mock).mockReturnValue(['', vi.fn(), mockSaveNameToLocalStorage]);
    (setNewPathWithoutDetails as Mock).mockReturnValue(
      mockSetNewPathWithoutDetails
    );

    render(<FormSearch />);

    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(mockSetNewPathWithoutDetails);
      expect(mockDispatch).toHaveBeenCalledWith(resetCurrentCard());
      expect(mockSaveNameToLocalStorage).toHaveBeenCalled();
    });
  });

  it('should navigate with search query on form submit without details query', async () => {
    const mockPush = vi.fn();
    const mockDispatch = vi.fn();
    const mockSaveNameToLocalStorage = vi.fn();

    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: {},
      push: mockPush,
    });

    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useLS as Mock).mockReturnValue([
      'tatooine',
      vi.fn(),
      mockSaveNameToLocalStorage,
    ]);

    render(<FormSearch />);

    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith({
        pathname: '/',
        query: { search: 'tatooine', page: 1 },
      });
      expect(mockDispatch).not.toHaveBeenCalled();
      expect(mockSaveNameToLocalStorage).toHaveBeenCalled();
    });
  });
});
