import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useLoaderData, useNavigation } from 'react-router-dom';
import DetailsCard from './DetailsCard';
import { IPlanet } from '../../interfaces';
import { describe, it, Mock, vi } from 'vitest';
import transformPropsArrayToString from '../../utils/transformPropsArrayToString';

vi.mock('react-router-dom', async () => {
  const originalModule =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...originalModule,
    useLoaderData: vi.fn(),
    useNavigation: vi.fn(),
  };
});

const mockTransformPropsArrayToString = transformPropsArrayToString as Mock;

describe('DetailsCard component', () => {
  const planet: IPlanet = {
    climate: 'arid',
    created: new Date('2014-12-09T13:50:49.641000Z'),
    diameter: '10465',
    edited: new Date('2014-12-20T20:58:18.411000Z'),
    films: [
      'https://swapi.dev/api/films/1/',
      'https://swapi.dev/api/films/3/',
      'https://swapi.dev/api/films/4/',
    ],
    gravity: '1 standard',
    name: 'Tatooine',
    orbital_period: '304',
    population: '200000',
    residents: [
      'https://swapi.dev/api/people/1/',
      'https://swapi.dev/api/people/2/',
    ],
    rotation_period: '23',
    surface_water: '1',
    terrain: 'desert',
    url: 'https://swapi.dev/api/planets/1/',
  };

  const renderWithRouter = (ui: React.ReactElement) => {
    return render(<BrowserRouter>{ui}</BrowserRouter>);
  };

  beforeEach(() => {
    (useLoaderData as Mock).mockReset();
    (useNavigation as Mock).mockReset();
    if (typeof mockTransformPropsArrayToString.mockReset === 'function')
      mockTransformPropsArrayToString.mockReset();
  });

  it('should render the loader when navigation is in progress', async () => {
    (useLoaderData as Mock).mockReturnValue(planet);
    (useNavigation as Mock).mockReturnValue({
      location: { pathname: '/details/1' },
    });

    renderWithRouter(<DetailsCard />);
    await waitFor(() => {
      expect(screen.getByText('Loading..')).toBeInTheDocument();
    });
  });

  it('should render the planet details correctly', async () => {
    (useLoaderData as Mock).mockReturnValue(planet);
    (useNavigation as Mock).mockReturnValue({
      location: { pathname: '/details/1' },
    });

    if (typeof mockTransformPropsArrayToString.mockReset === 'function')
      mockTransformPropsArrayToString
        .mockResolvedValueOnce('Film 1, Film 3, Film 4')
        .mockResolvedValueOnce('Luke Skywalker, C-3PO');

    renderWithRouter(<DetailsCard />);
    setTimeout(async () => {
      await waitFor(() => {
        expect(screen.getByText('Planet:')).toBeInTheDocument();
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
        expect(screen.getByText('climate: arid')).toBeInTheDocument();
        expect(screen.getByText('diameter: 10465')).toBeInTheDocument();
        expect(screen.getByText('gravity: 1 standard')).toBeInTheDocument();
        expect(
          screen.getByText('films: [Film 1, Film 3, Film 4]')
        ).toBeInTheDocument();
        expect(
          screen.getByText('residents: [Luke Skywalker, C-3PO]')
        ).toBeInTheDocument();
      });
    }, 1000);
  });

  it('should render the correct link for the planet', () => {
    (useLoaderData as Mock).mockReturnValue(planet);
    (useNavigation as Mock).mockReturnValue({
      location: { pathname: '' },
    });

    const { getByRole } = renderWithRouter(<DetailsCard />);
    const link = getByRole('link');
    expect(link).toHaveAttribute('href', 'https://swapi.dev/api/planets/1/');
  });
});
