import { Resources } from '../interfaces/enums';

const URL = 'https://swapi.dev/api/';
const resource: Resources = Resources.Planets;
export async function request(endpoint: string) {
  return await fetch(URL + endpoint).then((res) => res.json());
}

export function getPage(page: number = 1, search?: string) {
  if (search) {
    return request(`${resource}?page=${page}&search=${search}`);
  }

  return request(`${resource}?page=${page}`);
}
