import getDetailsNumber from '../utils/getDetailsNumber';
import { getDetails, getPage } from './api';

export async function loaderPageSearch({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const search = url.searchParams.get('search') ?? '';
  const response = await getPage(parseInt(page || '1'), search);
  return response;
}

export async function loaderDetails({ request }: { request: Request }) {
  console.log(request);
  const detailsNumber: number = getDetailsNumber(request.url);
  const response = await getDetails(detailsNumber);
  return response;
}
