import { vi } from 'vitest';

vi.mock('../service/apiRtk.ts', () => ({
  useGetDetailsQuery: vi.fn(() => ({
    data: {
      planet: 'Tatooine',
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
    },
    isFetching: false,
    error: null,
  })),
}));
