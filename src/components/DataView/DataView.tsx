import { IPlanet } from '../../interfaces';
import Card from '../Card';

export default function DataView({ planets }: { planets: IPlanet[] }) {
  return (
    <section className="section section-list">
      {planets?.length ? (
        <ul className="list">
          {planets.map((planet: IPlanet) => {
            return (
              <li className="list__card" key={planet.name}>
                <Card {...planet} />
              </li>
            );
          })}
        </ul>
      ) : (
        <h3>Not found</h3>
      )}
    </section>
  );
}
