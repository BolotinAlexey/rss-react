import { useState, useEffect } from 'react';
import { IPlanet } from '../../interfaces';
import Card from '../Card';
import getPage from '../../service/api';
import './dataView.css';
import Loader from '../Loader';

export default function DataView({ name }: { name: string | null }) {
  const [planets, setPlanets] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  console.log(name);

  const loadPage = async () => {
    setIsLoading(true);

    try {
      const list = await getPage(1, name ?? '');
      setPlanets(list.results);
      console.log(list.results, name);
    } catch (error) {
      console.error('Failed to fetch planets', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPage();
  }, [name]);

  return (
    <section className="section section-list">
      {isLoading ? (
        <Loader />
      ) : planets.length ? (
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
        <h3>Not founds</h3>
      )}
    </section>
  );
}
