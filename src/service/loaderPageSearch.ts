import { IPlanet } from '../interfaces';
import getPage from './api';
export async function loaderPageSearch({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const search = url.searchParams.get('search') ?? '';
  console.log(page, search);

  const planets: IPlanet[] = await getPage(parseInt(page || '1'), search);
  console.log(planets);
  return { planets };
}
