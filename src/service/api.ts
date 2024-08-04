import { URL } from '../constants';
import { IPlanet, IPlanetResponse, Resources } from '../interfaces';

const resource: Resources = Resources.Planets;
export async function request(endpoint: string) {
  return await fetch(URL + endpoint).then((res) => res.json());
}

export async function getPage(
  page: number = 1,
  search: string = ''
): Promise<IPlanetResponse> {
  return await request(`${resource}?page=${page}&search=${search}`);
}

export async function getDetails(id: string): Promise<IPlanet> {
  return request(`${resource}/${id}`);
}
