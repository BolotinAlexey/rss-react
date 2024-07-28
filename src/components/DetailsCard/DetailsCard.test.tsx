import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import DetailsCard from './DetailsCard';
import { setCurrentCard } from '../../store/slices/currentCardSlice';
import store from '../../store/store';
import { useGetDetailsQuery } from '../../service/apiRtk';

vi.mock('../../service/apiRtk', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-redux');
  return {
    ...actual,
    useGetDetailsQuery: vi.fn(),
  };
});

vi.mock('../../utils/transformPropsArrayToString', () => ({
  default: vi.fn().mockResolvedValue('mocked string'),
}));

vi.mock('../../utils/styleTheme', () => ({
  default: vi.fn().mockReturnValue({ backgroundColor: 'white' }),
}));

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ['light'],
}));

// Mock CloseDetailsButton component
vi.mock('./CloseDetailsButton', () => ({
  default: () => <button>Close</button>,
}));

describe('DetailsCard Component', () => {
  it('should display error message if there is an error', () => {
    (useGetDetailsQuery as Mock).mockReturnValue({
      data: null,
      isFetching: false,
      error: { message: 'Error message' },
    });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailsCard />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Error: Error message')).toBeInTheDocument();
  });

  it('should dispatch setCurrentCard action when data is fetched', async () => {
    const mockPlanet = {
      climate: 'arid',
      created: new Date('2014-12-09T13:50:49.641000Z'),
      diameter: '10465',
      edited: new Date('2014-12-20T20:58:18.411000Z'),
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
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

    (useGetDetailsQuery as Mock).mockReturnValue({
      data: mockPlanet,
      isFetching: false,
      error: null,
    });

    const dispatch = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailsCard />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setCurrentCard(mockPlanet));
    });
  });
});
