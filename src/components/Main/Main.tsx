import DataView from '../DataView';
import FormSearch from '../FormSearch';
import Paginator from '../Paginator';
import { useDispatch } from 'react-redux';
import FlyOut from '../FlyOut/FlyOut';
import { useRouter } from 'next/router';
import { IPlanet, IPlanetResponse } from '../../interfaces';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';
import { useEffect } from 'react';
import DetailsCard from '../DetailsCard';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import { PlanetArrayDetails } from '../../pages';
import useLoading from '../../hooks/useLoading';
import Loader from '../Loader';

export default function Main({
  response,
  planet,
  planetArrayDetails,
}: {
  response: IPlanetResponse;
  planet: IPlanet;
  planetArrayDetails: PlanetArrayDetails;
}) {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isLoading] = useLoading();

  useEffect(() => {
    const query = { ...router.query };
    if (!router.query.page) query.page = '1';
    if (!router.query.search) query.search = '';
    if (!router.query.page || !router.query.search)
      router.push({
        pathname: router.pathname,
        query,
      });
  }, []);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    if (router.query.details) {
      const newPathWithoutDetails = setNewPathWithoutDetails(router);
      router.push(newPathWithoutDetails);
      dispatch(resetCurrentCard());
    }
  };

  return (
    <section className={'main-wrap'}>
      {isLoading && <Loader />}
      <div className="left-section" onClick={handleClickOutside}>
        <h1>Planets</h1>
        <FormSearch />
        <hr />
        <DataView planets={response?.results} />
        <Paginator countPages={response?.count} />
        <FlyOut />
      </div>
      {planet && (
        <DetailsCard planet={planet} planetArrayDetails={planetArrayDetails} />
      )}
    </section>
  );
}
