import { useEffect } from 'react';
import { IPlanet } from '../../interfaces';
import Card from '../Card';
import './dataView.css';
import Loader from '../Loader';
import { useLocation, useNavigate } from 'react-router-dom';
import { useGetPlanetsQuery } from '../../service/apiRtk';

export default function DataView({ name }: { name: string | null }) {
  // const response = useLoaderData() as IPlanetResponse;
  // const planets = response.results;
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const search = params.get('search') || '';
  const page = Number.parseInt(params.get('page') || '1');
  // const navigation = useNavigation();
  // const isLoader =
  //   navigation.location &&
  //   new URLSearchParams(navigation.location.search).has('search') &&
  //   !navigation.location.pathname.includes('details');

  const { data, isFetching, error } = useGetPlanetsQuery({ page, search });

  useEffect(() => {
    if (name !== null) navigate(`?page=1&search=${name}`);
  }, [name]);

  const planets = data?.results;

  if (error) return <h3>Error: {error.message}</h3>;

  return (
    <section className="section section-list">
      {isFetching ? (
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
        <h3>Not founds</h3>
      )}
    </section>
  );
}
