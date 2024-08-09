import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import useLS from '../../hooks/useLS';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import FormSearch from './FormSearch';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../hooks/useLS', () => ({
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

  it('should navigate and dispatch action on form submit', async () => {
    const mockPush = vi.fn();
    const mockDispatch = vi.fn();
    const mockSaveNameToLocalStorage = vi.fn();

    (useRouter as Mock).mockReturnValue({
      push: mockPush,
    });

    (useSearchParams as Mock).mockReturnValue(new URLSearchParams(''));
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (useLS as Mock).mockReturnValue([
      'tatooine',
      vi.fn(),
      mockSaveNameToLocalStorage,
    ]);

    render(<FormSearch />);

    fireEvent.submit(screen.getByTestId('form'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith('/?page=1&search=tatooine');
      expect(mockDispatch).toHaveBeenCalledWith(resetCurrentCard());
      expect(mockSaveNameToLocalStorage).toHaveBeenCalled();
    });
  });
});
