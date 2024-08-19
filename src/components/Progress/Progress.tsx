import './progress.css';

export default function Progress({ deg }: { deg: number }) {
  const progressArray = ['purple', 'red', 'orange', 'yellow', 'green'];
  if (!deg) return null;
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
