import '@testing-library/jest-dom';
import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { IPlanet } from '../../interfaces';
import { describe, expect, it, vi } from 'vitest';
import Card from '../Card';
import { Provider } from 'react-redux';
import store from '../../store';

vi.mock('../../utils/searchLastNumber', () => ({
  default: vi
    .fn()
    .mockImplementation((url) => url.split('/').filter(Boolean).pop()),
}));

describe('Card component', () => {
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

  it('should render the planet name correctly', () => {
    const { getByText } = renderWithRouter(
      <Provider store={store}>
        <Card {...planet} />
      </Provider>
    );

    expect(getByText('Planet:')).toBeInTheDocument();
    expect(getByText('Tatooine')).toBeInTheDocument();
  });
});
