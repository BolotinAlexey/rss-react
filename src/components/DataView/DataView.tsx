import { IPlanet } from '../../interfaces';
import Card from '../Card';
import Loader from '../Loader';
// import type { InferGetServerSidePropsType, GetServerSideProps } from 'next';
// import { useRouter } from 'next/router';
// import searchString from '../../utils/searchString';
// import { getPage } from '../../service/api';

export default function DataView({ planets }: { planets: IPlanet[] }) {
  // const router = useRouter();
  // const { query, push } = router;
  // console.log(router);

  // const searchStringURL = searchString(router);

  // const valueSearch =
  // const search = Object.keys(query).find((el) => el === 'search') || '';
  // const search = query?.search?.toString() || '';
  // const page = Number.parseInt(query?.page?.toString() || '1');
  // console.log('page' + page);

  // const { data, isFetching, error } = useGetPlanetsQuery({ page, search });

  // useEffect(() => {
  //   if (name !== null) push(`?page=${page}&search=${name}`);
  // }, [name]);

  // const planets = data?.results;

  // if (error) return <h3>Error: {error.message}</h3>;

  return (
    <section className="section section-list">
      {!planets ? (
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
