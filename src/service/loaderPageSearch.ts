import getPage from './api';
export async function loaderPageSearch({ request }: { request: Request }) {
  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const search = url.searchParams.get('search') ?? '';
  console.log(page, search);

  const response = await getPage(parseInt(page || '1'), search);
  return response;
}

export async function loaderDetails({ request }: { request: Request }) {
  // console.log(request);

  const url = new URL(request.url);
  const page = url.searchParams.get('page');
  const search = url.searchParams.get('search') ?? '';
  console.log(page, search);

  const response = await getPage(parseInt(page || '1'), search);
  return response;
}
