import { useRouter, useSearchParams } from 'next/navigation';

export default function LinkPage({ page }: { page: number }) {
  const router = useRouter();
  const query = useSearchParams();

  const createPageUrl = () => {
    const search = query.get('search');
    router.push(`?page=${page}&search=${search}`);
  };

  const isActive = () => {
    return query.get('page') === page.toString();
  };

  return (
    <button
      onClick={createPageUrl}
      className={isActive() ? 'paginator__link active-page' : 'paginator__link'}
    >
      {page}
    </button>
  );
}
