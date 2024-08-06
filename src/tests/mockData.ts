import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import { NextRouter } from 'next/router';
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

export const mockPlanet1 = {
  climate: 'arid',
  created: new Date('2014-12-09T13:50:49.641000Z'),
  diameter: '10465',
  edited: new Date('2014-12-20T20:58:18.411000Z'),
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/3/'],
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

export const mockPlanet2 = {
  rotation_period: '24',
  orbital_period: '364',
  diameter: '12500',
  climate: 'temperate',
  created: new Date('2014-12-10T11:35:48.479000Z'),
  edited: new Date('2014-12-20T20:58:18.420000Z'),
  films: ['https://swapi.dev/api/films/1/', 'https://swapi.dev/api/films/6/'],
  gravity: '1 standard',
  name: 'Alderaan',
  population: '2000000000',
  residents: [
    'https://swapi.dev/api/people/5/',
    'https://swapi.dev/api/people/68/',
    'https://swapi.dev/api/people/81/',
  ],
  surface_water: '40',
  terrain: 'grasslands, mountains',
  url: 'https://swapi.dev/api/planets/2/',
};

export const planetArrayDetails1 = {
  filmTitles:
    'A New Hope, Return of the Jedi, The Phantom Menace, Attack of the Clones, Revenge of the Sith',
  residentNames:
    'Luke Skywalker, C-3PO, Darth Vader, Owen Lars, Beru Whitesun lars, R5-D4, Biggs Darklighter, Anakin Skywalker, Shmi Skywalker, Cliegg Lars',
};

export const planetArrayDetails2 = {
  filmTitles: 'A New Hope, Revenge of the Sith',
  residentNames: 'Leia Organa, Bail Prestor Organa, Raymus Antilles',
};

export const mockRouter = (query: NextParsedUrlQuery): NextRouter =>
  ({
    query,
  }) as unknown as NextRouter;
