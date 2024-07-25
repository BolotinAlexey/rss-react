// import { vi } from 'vitest';
// import { URL } from '../constants';
// import { Resources } from '../interfaces';
// import { request, getPage, getDetails } from '../service/api';

// global.fetch = vi.fn();

// describe('request function', () => {
//   it('should fetch data from the correct URL', async () => {
//     const endpoint = '/test';
//     const mockResponse = { data: 'test data' };
//     (global.fetch as jest.Mock).mockResolvedValue({
//       json: async () => mockResponse,
//     });

//     const result = await request(endpoint);

//     expect(global.fetch).toHaveBeenCalledWith(URL + endpoint);
//     expect(result).toEqual(mockResponse);
//   });
// });

// describe('getPage function', () => {
//   it('should fetch page data without search query', async () => {
//     const page = 1;
//     const mockResponse = { data: 'page data' };
//     (global.fetch as jest.Mock).mockResolvedValue({
//       json: async () => mockResponse,
//     });

//     const result = await getPage(page);

//     expect(global.fetch).toHaveBeenCalledWith(
//       `${URL}${Resources.Planets}?page=${page}`
//     );
//     expect(result).toEqual(mockResponse);
//   });

//   it('should fetch page data with search query', async () => {
//     const page = 2;
//     const search = 'keyword';
//     const mockResponse = { data: 'search data' };
//     (global.fetch as jest.Mock).mockResolvedValue({
//       json: async () => mockResponse,
//     });

//     const result = await getPage(page, search);

//     expect(global.fetch).toHaveBeenCalledWith(
//       `${URL}${Resources.Planets}?page=${page}&search=${search}`
//     );
//     expect(result).toEqual(mockResponse);
//   });
// });

// describe('getDetails function', () => {
//   it('should fetch details for a given ID', async () => {
//     const id = 123;
//     const mockResponse = { details: 'mock details' };
//     (global.fetch as jest.Mock).mockResolvedValue({
//       json: async () => mockResponse,
//     });

//     const result = await getDetails(id);

//     expect(global.fetch).toHaveBeenCalledWith(
//       `${URL}${Resources.Planets}/${id}`
//     );
//     expect(result).toEqual(mockResponse);
//   });
// });
