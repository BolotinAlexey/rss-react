import { useRouter } from 'next/router';

export default function LinkPage({ page }: { page: number }) {
  const router = useRouter();

  const createPageUrl = () => {
    const currentQuery = { ...router.query, page };
    router.push({ pathname: router.pathname, query: currentQuery });
  };

  const isActive = () => {
    return router.query.page === page.toString();
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
