import { useLoaderData } from 'react-router-dom';
import { IPlanetResponse } from '../../interfaces';
import LinkPage from './LinkPage';
import './paginator.css';

export default function Paginator() {
  const response = useLoaderData() as IPlanetResponse;

  const number = Math.ceil(response.count / 10);
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
