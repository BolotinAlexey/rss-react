import { NavLink, useLocation } from 'react-router-dom';
import { LS_KEY } from '../../constants';

export default function LinkPage({ page }: { page: number }) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const createPageUrl = (pageNumber: number) => {
    params.set('page', pageNumber.toString());
    console.log(params.get('search'));
    if (params.get('search') === null) {
      const word = localStorage.getItem(LS_KEY) ?? '';
      params.set('search', word);
    }

    return `/?${params.toString()}`;
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
