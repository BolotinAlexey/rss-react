import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { useDispatch } from 'react-redux';
import { setCurrentCard } from '../../store/slices/currentCardSlice';
import { mockPlanet1, mockPlanetArrayDetails1 } from '../../tests/mockData';
import DetailaCard from './DetailsCard';

vi.mock('react-redux', () => ({
  useDispatch: vi.fn(),
}));

vi.mock('../../components/DetailsCard/CloseDetailsButton', () => ({
  __esModule: true,
  default: () => <button>Close</button>,
}));

describe('DetailaCard', () => {
  const mockDispatch = vi.fn();

  beforeEach(() => {
    (useDispatch as unknown as Mock).mockReturnValue(mockDispatch);
  });

  it('should render the component and dispatch setCurrentCard action on mount', () => {
    render(
      <DetailaCard
        planet={mockPlanet1}
        planetArrayDetails={{ filmTitles: 'film1', residentNames: 'people1' }}
      />
    );

    expect(mockDispatch).toHaveBeenCalledWith(setCurrentCard(mockPlanet1));

    expect(screen.getByText(/Details/)).toBeInTheDocument();
    expect(screen.getByText(/Planet:/)).toBeInTheDocument();
    expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
    expect(screen.getByText(/created/)).toBeInTheDocument();
    expect(screen.getByText(/edited/)).toBeInTheDocument();
    expect(screen.getByText(/film1/)).toBeInTheDocument();
    expect(screen.getByText(/people1/)).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute(
      'href',
      'https://swapi.dev/api/planets/1/'
    );
    expect(screen.getByText(/Close/)).toBeInTheDocument();
  });

  it('should format dates correctly', () => {
    render(
      <DetailaCard
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails1}
      />
    );

    expect(screen.getByText(/Tue Dec 09/)).toBeInTheDocument();
    expect(screen.getByText(/Sat Dec 20/)).toBeInTheDocument();
  });

  it('should conditionally render additional details', () => {
    render(
      <DetailaCard
        planet={mockPlanet1}
        planetArrayDetails={{ filmTitles: '', residentNames: '' }}
      />
    );
    expect(screen.queryByText(/films:/)).toBeNull();
    expect(screen.queryByText(/residents:/)).toBeNull();
  });
});
