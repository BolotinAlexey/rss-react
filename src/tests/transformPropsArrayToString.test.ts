import '@testing-library/jest-dom';
import { vi } from 'vitest';
import transformPropsArrayToString from '../utils/transformPropsArrayToString';

global.fetch = vi.fn(async (input) => {
  const responseData = input.includes('/films/')
    ? { title: 'Mock Film Title' }
    : { name: 'Mock Person Name' };

  const response = {
    async json() {
      return responseData;
    },
    headers: new Headers(),
    ok: true,
    redirected: false,
    status: 200,
    statusText: 'OK',
    type: 'basic',
    url: input instanceof URL ? input.href : input,
    clone() {},
    bodyUsed: false,
    arrayBuffer: async () => new ArrayBuffer(0),
    blob: async () => new Blob(),
    formData: async () => new FormData(),
    text: async () => JSON.stringify(responseData),
  };

  return Promise.resolve(response as Response);
});

describe('transformPropsArrayToString function', () => {
  it('should transform an array of film URLs into comma-separated titles', async () => {
    const filmUrls = ['https://mock.api/films/1', 'https://mock.api/films/2'];
    const result = await transformPropsArrayToString(filmUrls, 'title');
    expect(result).toEqual('Mock Film Title, Mock Film Title');
  });

  it('should transform an array of people URLs into comma-separated names', async () => {
    const peopleUrls = [
      'https://mock.api/people/1',
      'https://mock.api/people/2',
    ];
    const result = await transformPropsArrayToString(peopleUrls, 'name');
    expect(result).toEqual('Mock Person Name, Mock Person Name');
  });

  it('should return an empty string for an empty array', async () => {
    const emptyArray: string[] = [];
    const result = await transformPropsArrayToString(emptyArray, 'title');
    expect(result).toEqual('');
  });
});
