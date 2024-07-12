import { useEffect } from 'react';
import { IPlanet, IPlanetResponse } from '../../interfaces';
import Card from '../Card';
// import getPage from '../../service/api';
import './dataView.css';
import Loader from '../Loader';
import {
  useLoaderData,
  useLocation,
  useNavigate,
  useNavigation,
} from 'react-router-dom';

export default function DataView({ name }: { name: string | null }) {
  // const [planets, setPlanets] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  const response = useLoaderData() as IPlanetResponse;
  console.log(response);
  const planets = response.results;
  const navigate = useNavigate();
  const page = new URLSearchParams(useLocation().search).get('page') ?? 1;

  const { state } = useNavigation();

  // const loadPage = async () => {
  //   setIsLoading(true);

  //   try {
  //     // const list = await getPage(1, name ?? '');
  //     // console.log(list.results, name);
  //     // setPlanets(list.results);
  //     navigate(`?page=${page}&search=${name}`);
  //   } catch (error) {
  //     console.error('Failed to fetch planets', error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  useEffect(() => {
    if (name !== null) navigate(`?page=${page}&search=${name}`);
  }, [name]);

  return (
    <section className="section section-list">
      {state === 'loading' ? (
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
