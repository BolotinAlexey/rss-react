import { NavLink, useLocation } from 'react-router-dom';

export default function LinkPage({ page }: { page: number }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const createPageUrl = (pageNumber: number) => {
    params.set('page', pageNumber.toString());
    return `${location.pathname}?${params.toString()}`;
  };

  const isActive = () => {
    return params.get('page') === page.toString();
  };

  return (
    <NavLink
      className={isActive() ? 'paginator__link active-page' : 'paginator__link'}
      to={createPageUrl(page)}
    >
      {page}
    </NavLink>
  );
}
