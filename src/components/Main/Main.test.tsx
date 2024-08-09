import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter, useSearchParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import Main from './Main';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import { IPlanet, IPlanetResponse } from '../../interfaces';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';
import { mockPlanet1, mockPlanetArrayDetails1 } from '../../tests/mockData';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../utils/setNewPathWithoutDetails', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../DataView', () => ({
  __esModule: true,
  default: () => <div>DataView</div>,
}));

vi.mock('../FormSearch', () => ({
  __esModule: true,
  default: () => <div>FormSearch</div>,
}));

vi.mock('../Paginator', () => ({
  __esModule: true,
  default: () => <div>Paginator</div>,
}));

vi.mock('../FlyOut/FlyOut', () => ({
  __esModule: true,
  default: () => <div>FlyOut</div>,
}));

vi.mock('../DetailsCard', () => ({
  __esModule: true,
  default: () => <div>DetailsCard</div>,
}));

vi.mock('../Loader', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

describe('Main Component', () => {
  const mockResponse: IPlanetResponse = {
    results: [{ name: 'Tatooine' }] as IPlanet[],
    count: 20,
    next: null,
    previous: null,
  };

  it('should render child components correctly', () => {
    const mockPush = vi.fn();
    const mockSearchParams = new URLSearchParams();

    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      push: mockPush,
    });

    (useSearchParams as Mock).mockReturnValue(mockSearchParams);

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    expect(screen.getByText('FormSearch')).toBeInTheDocument();
    expect(screen.getByText('DataView')).toBeInTheDocument();
    expect(screen.getByText('Paginator')).toBeInTheDocument();
    expect(screen.getByText('FlyOut')).toBeInTheDocument();
    expect(screen.getByText('DetailsCard')).toBeInTheDocument();
  });

  it('should render Loader when isLoading is true', () => {
    const mockPush = vi.fn();
    const mockSearchParams = new URLSearchParams();

    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      push: mockPush,
    });

    (useSearchParams as Mock).mockReturnValue(mockSearchParams);

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    expect(screen.queryByText('Loading...')).toBeNull();
  });

  it('should handle click outside and dispatch resetCurrentCard action', async () => {
    const mockPush = vi.fn();
    const mockDispatch = vi.fn();
    const mockSetNewPathWithoutDetails = '/?page=1&search=';
    const mockSearchParams = new URLSearchParams({ details: '123' });

    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      push: mockPush,
    });

    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
    (setNewPathWithoutDetails as Mock).mockReturnValue(
      mockSetNewPathWithoutDetails
    );

    (useSearchParams as Mock).mockReturnValue(mockSearchParams);

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    fireEvent.click(screen.getByText('FormSearch'));
    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(mockSetNewPathWithoutDetails);
      expect(mockDispatch).toHaveBeenCalledWith(resetCurrentCard());
    });
  });

  it('should redirect to the correct query page on mount', () => {
    const mockPush = vi.fn();
    const mockSearchParams = new URLSearchParams();

    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      push: mockPush,
    });

    (useSearchParams as Mock).mockReturnValue(mockSearchParams);

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    expect(mockPush).toHaveBeenCalledWith('/?page=1&search=');
  });
});
