import { useEffect } from 'react';
import { IPlanet, IPlanetResponse } from '../../interfaces';
import Card from '../Card';
import './dataView.css';
import Loader from '../Loader';
import { useLoaderData, useNavigate, useNavigation } from '@remix-run/react';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

export default function DataView({ name }: { name: string | null }) {
  const navigate = useNavigate();
  const navigation = useNavigation();
  const { res } = useLoaderData() as unknown as { res: IPlanetResponse };

  useEffect(() => {
    if (name !== null) navigate(`?page=1&search=${name}`);
  }, [name]);

  const planets = res?.results;
  const currentPlanet = useSelector(
    (state: RootState) => state.currentCard.currentCard
  );

  return (
    <section className="section section-list">
      {navigation.state === 'loading' && !currentPlanet ? (
        <Loader />
      ) : planets?.length ? (
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
