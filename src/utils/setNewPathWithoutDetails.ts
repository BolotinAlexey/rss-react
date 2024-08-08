import { ReadonlyURLSearchParams } from 'next/navigation';

export default function setNewPathWithoutDetails(
  query: ReadonlyURLSearchParams
) {
  const page = query.get('page');
  const search = query.get('search');

  return `/?page=${page}&search=${search}`;
}
