import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import Main from './Main';
// import Loader from '../Loader';
// import DataView from '../DataView';
// import FormSearch from '../FormSearch';
// import Paginator from '../Paginator';
// import FlyOut from '../FlyOut/FlyOut';
// import DetailsCard from '../DetailsCard';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import { IPlanet, IPlanetResponse } from '../../interfaces';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';
import useLoading from '../../hooks/useLoading';
import { mockPlanet1, mockPlanetArrayDetails1 } from '../../tests/mockData';

vi.mock('next/router', () => ({
  useRouter: vi.fn(),
}));

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../hooks/useLoading', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../../utils/setNewPathWithoutDetails', () => ({
  __esModule: true,
  default: vi.fn(),
}));

vi.mock('../Loader', () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
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

describe('Main Component', () => {
  const mockResponse: IPlanetResponse = {
    results: [{ name: 'Tatooine' }] as IPlanet[],
    count: 20,
    next: null,
    previous: null,
  };
  (useLoading as Mock).mockReturnValue([false]);

  it('should render child components correctly', () => {
    const mockPush = vi.fn();
    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: {},
      push: mockPush,
    });

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    expect(screen.getByText('Planets')).toBeInTheDocument();
    expect(screen.getByText('FormSearch')).toBeInTheDocument();
    expect(screen.getByText('DataView')).toBeInTheDocument();
    expect(screen.getByText('Paginator')).toBeInTheDocument();
    expect(screen.getByText('FlyOut')).toBeInTheDocument();
    expect(screen.getByText('DetailsCard')).toBeInTheDocument();
  });

  it('should render Loader when isLoading is true', () => {
    (useLoading as Mock).mockReturnValue([true]);
    const mockPush = vi.fn();
    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: {},
      push: mockPush,
    });

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('should not render Loader when isLoading is false', () => {
    (useLoading as Mock).mockReturnValue([false]);
    const mockPush = vi.fn();
    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: {},
      push: mockPush,
    });

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
    (setNewPathWithoutDetails as Mock).mockReturnValue(
      mockSetNewPathWithoutDetails
    );

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    fireEvent.click(screen.getByText('Planets'));

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith(mockSetNewPathWithoutDetails);
      expect(mockDispatch).toHaveBeenCalledWith(resetCurrentCard());
    });
  });

  it('should redirect to the correct query page on mount', () => {
    const mockPush = vi.fn();

    (useRouter as Mock).mockReturnValue({
      pathname: '/',
      query: { search: '', page: '' },
      push: mockPush,
    });

    render(
      <Main
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    expect(mockPush).toHaveBeenCalledWith({
      pathname: '/',
      query: { search: '', page: '1' },
    });
  });
});
