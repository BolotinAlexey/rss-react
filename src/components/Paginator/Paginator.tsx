import { useLocation } from 'react-router-dom';
import LinkPage from './LinkPage';
import { useGetPlanetsQuery } from '../../service/apiRtk';

export default function Paginator() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search') || '';
  const page = Number.parseInt(params.get('page') || '1');
  const { data } = useGetPlanetsQuery({ page, search });

  const number = data?.count ? Math.ceil(Number.parseInt(data?.count) / 10) : 0;

  if (!data) return null;
  return (
    <div className="paginator">
      <ul className="paginator__list">
        {...new Array(number).fill(null).map((_, i) => (
          <li className="paginator__item" key={i + 1}>
            <LinkPage page={i + 1} />
          </li>
        ))}
      </ul>
    </div>
  );
}
