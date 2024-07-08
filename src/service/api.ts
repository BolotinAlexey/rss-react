import { URL } from '../constants';
import { Resources } from '../interfaces';

const resource: Resources = Resources.Planets;
export async function request(endpoint: string) {
  return await fetch(URL + endpoint).then((res) => res.json());
}

export default async function getPage(page: number = 1, search?: string) {
  if (search) {
    return await request(`${resource}?page=${page}&search=${search}`);
  }

  return request(`${resource}?page=${page}`);
}
