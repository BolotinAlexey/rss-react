import { URL } from '../constants';
import { Resources } from '../interfaces';

const resource: Resources = Resources.Planets;
export async function request(endpoint: string) {
  return await fetch(URL + endpoint).then((res) => res.json());
}

export async function getPage(page: number = 1, search: string = '') {
  return await request(`${resource}?page=${page}&search=${search}`);
}

export async function getDetails(id: number) {
  return request(`${resource}/${id}`);
}
