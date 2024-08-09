import { vi } from 'vitest';
import fetch from 'node-fetch';
import { URL } from '../constants';
import { Resources } from '../interfaces';
import { request, getPage, getDetails } from '../service/api';

vi.mock('node-fetch', () => ({
  __esModule: true,
  default: vi.fn(),
}));

describe('request function', () => {
  it('should fetch data from the correct URL', async () => {
    const endpoint = '/test';
    const mockResponse = { data: 'test data' };
    (fetch as unknown as jest.Mock).mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await request(endpoint);

    expect(fetch).toHaveBeenCalledWith(URL + endpoint);
    expect(result).toEqual(mockResponse);
  });
});

describe('getPage function', () => {
  it('should fetch page data without search query', async () => {
    const mockResponse = { data: 'page data' };
    (fetch as unknown as jest.Mock).mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await getPage();

    expect(fetch).toHaveBeenCalledWith(
      `${URL}${Resources.Planets}?page=1&search=`
    );
    expect(result).toEqual(mockResponse);
  });

  it('should fetch page data with search query', async () => {
    const page = 1;
    const search = 'a';
    const mockResponse = { data: 'search data' };
    (fetch as unknown as jest.Mock).mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await getPage(page, search);

    expect(fetch).toHaveBeenCalledWith(
      `${URL}${Resources.Planets}?page=${page}&search=${search}`
    );
    expect(result).toEqual(mockResponse);
  });
});

describe('getDetails function', () => {
  it('should fetch details for a given ID', async () => {
    const id = '123';
    const mockResponse = { details: 'mock details' };
    (fetch as unknown as jest.Mock).mockResolvedValue({
      json: async () => mockResponse,
    });

    const result = await getDetails(id);

    expect(fetch).toHaveBeenCalledWith(`${URL}${Resources.Planets}/${id}`);
    expect(result).toEqual(mockResponse);
  });
});
