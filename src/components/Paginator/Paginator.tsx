import { useLoaderData } from '@remix-run/react';
import LinkPage from './LinkPage';
import './paginator.css';
import { IPlanetResponse } from '../../interfaces';

export default function Paginator() {
  const { res } = useLoaderData() as unknown as { res: IPlanetResponse };
  const number = res?.count ? Math.ceil(res?.count / 10) : 0;

  if (!res) return null;
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
