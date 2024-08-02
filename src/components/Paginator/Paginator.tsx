import LinkPage from './LinkPage';

export default function Paginator({ countPages }: { countPages: number }) {
  // const search = params.get('search') || '';
  // const page = Number.parseInt(params.get('page') || '1');

  const number = countPages ? Math.ceil(countPages / 10) : 0;

  // if (!data) return null;
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
