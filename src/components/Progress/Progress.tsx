import './progress.css';

export default function Progress({ deg }: { deg: number }) {
  const progressArray = ['red', 'yellow', 'green'];
  if (!deg) return <ul className="progress"></ul>;
  return (
    <ul className="progress">
      {...new Array(deg).fill(
        <li
          style={{ backgroundColor: progressArray[deg - 1] }}
          className="progress__item"
        ></li>
      )}
    </ul>
  );
}
