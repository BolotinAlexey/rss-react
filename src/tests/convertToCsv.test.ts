import { describe, it, expect } from 'vitest';
import convertToCsv from '../utils/convertToCsv';
import { IPlanet } from '../interfaces';

describe('convertToCsv', () => {
  it('should convert array of IPlanet to CSV format correctly', () => {
    const input: IPlanet[] = [
      {
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
      },
    ];

    const expectedOutput =
      'climate : arid\ncreated : Tue Dec 09 2014 14:50:49 GMT+0100 (Central European Standard Time)\ndiameter : 10465\nedited : Sat Dec 20 2014 21:58:18 GMT+0100 (Central European Standard Time)\nfilms : https://swapi.dev/api/films/1/,https://swapi.dev/api/films/3/\ngravity : 1 standard\nname : Tatooine\norbital_period : 304\npopulation : 200000\nresidents : https://swapi.dev/api/people/1/,https://swapi.dev/api/people/2/\nrotation_period : 23\nsurface_water : 1\nterrain : desert\nurl : https://swapi.dev/api/planets/1/';

    expect(convertToCsv(input)).toBe(expectedOutput);
  });

  it('should handle empty array', () => {
    const input: IPlanet[] = [];
    const expectedOutput = '';
    expect(convertToCsv(input)).toBe(expectedOutput);
  });

  it('should handle array with multiple objects', () => {
    const input: IPlanet[] = [
      {
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
      },
      {
        climate: 'temperate',
        created: new Date('2014-12-09T13:50:49.641000Z'),
        diameter: '10465',
        edited: new Date('2014-12-20T20:58:18.411000Z'),
        films: ['https://swapi.dev/api/films/2/'],
        gravity: '1.2 standard',
        name: 'Naboo',
        orbital_period: '312',
        population: '450000000',
        residents: ['https://swapi.dev/api/people/3/'],
        rotation_period: '26',
        surface_water: '12',
        terrain: 'grassy',
        url: 'https://swapi.dev/api/planets/2/',
      },
    ];

    const expectedOutput =
      'climate : arid\ncreated : Tue Dec 09 2014 14:50:49 GMT+0100 (Central European Standard Time)\ndiameter : 10465\nedited : Sat Dec 20 2014 21:58:18 GMT+0100 (Central European Standard Time)\nfilms : https://swapi.dev/api/films/1/,https://swapi.dev/api/films/3/\ngravity : 1 standard\nname : Tatooine\norbital_period : 304\npopulation : 200000\nresidents : https://swapi.dev/api/people/1/,https://swapi.dev/api/people/2/\nrotation_period : 23\nsurface_water : 1\nterrain : desert\nurl : https://swapi.dev/api/planets/1/\n\n\nclimate : temperate\ncreated : Tue Dec 09 2014 14:50:49 GMT+0100 (Central European Standard Time)\ndiameter : 10465\nedited : Sat Dec 20 2014 21:58:18 GMT+0100 (Central European Standard Time)\nfilms : https://swapi.dev/api/films/2/\ngravity : 1.2 standard\nname : Naboo\norbital_period : 312\npopulation : 450000000\nresidents : https://swapi.dev/api/people/3/\nrotation_period : 26\nsurface_water : 12\nterrain : grassy\nurl : https://swapi.dev/api/planets/2/';

    expect(convertToCsv(input)).toBe(expectedOutput);
  });
});
