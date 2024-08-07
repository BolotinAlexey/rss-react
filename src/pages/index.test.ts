import { describe, it, expect, vi, Mock } from 'vitest';
import { getServerSideProps } from './index';
import { getPage, getDetails } from '../service/api';
import transformPropsArrayToString from '../utils/transformPropsArrayToString';
import { IFilm, IPeople } from '../interfaces';
import { GetServerSidePropsContext } from 'next';

vi.mock('../service/api', () => ({
  getPage: vi.fn(),
  getDetails: vi.fn(),
}));

vi.mock('../utils/transformPropsArrayToString', () => ({
  default: vi.fn(),
}));

describe('index.ts getServerSideProps', () => {
  it('should return correct props for IndexPage', async () => {
    const mockResponse = { results: [], count: 0, next: null, previous: null };
    const mockPlanet = {
      films: ['Film1', 'Film2'],
      residents: ['Resident1', 'Resident2'],
    };
    const mockFilmTitles = 'Film1, Film2';
    const mockResidentNames = 'Resident1, Resident2';

    (getPage as Mock).mockResolvedValue(mockResponse);
    (getDetails as Mock).mockResolvedValue(mockPlanet);
    (transformPropsArrayToString as Mock).mockImplementation(
      (arr: string[] | IPeople[] | IFilm[]) => {
        return arr.join(', ');
      }
    );

    const context = {
      query: { page: '1', search: '', details: '1' },
    } as unknown as GetServerSidePropsContext;

    const { props } = await getServerSideProps(context);

    expect(props).toEqual({
      resp: mockResponse,
      planet: mockPlanet,
      planetArrayDetails: {
        filmTitles: mockFilmTitles,
        residentNames: mockResidentNames,
      },
    });
  });
});
