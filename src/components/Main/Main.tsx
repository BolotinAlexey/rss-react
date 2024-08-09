'use client';

import DataView from '../DataView';
import FormSearch from '../FormSearch';
import Paginator from '../Paginator';
import { useDispatch } from 'react-redux';
import FlyOut from '../FlyOut/FlyOut';
import { useRouter } from 'next/navigation';
import { IPlanet, IPlanetResponse, PlanetArrayDetails } from '../../interfaces';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';
import { Suspense, useEffect } from 'react';
import DetailsCard from '../DetailsCard';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import Loader from '../Loader';
import { useSearchParams } from 'next/navigation';

export default function Main({
  response,
  planet,
  planetArrayDetails,
}: {
  response: IPlanetResponse;
  planet: IPlanet | null;
  planetArrayDetails: PlanetArrayDetails;
}) {
  const router = useRouter();
  const dispatch = useDispatch();
  const query = useSearchParams();

  useEffect(() => {
    const page = query.has('page') ? query.get('page') : '1';
    const search = query.has('search') ? query.get('search') : '';
    const details = query.get('details');
    if (!query.has('page') || !query.has('search')) {
      if (details) {
        router.push(`/?page=${page}&search=${search}&details=${details}`);
      } else {
        router.push(`/?page=${page}&search=${search}`);
      }
    }
  }, []);

  const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    if (query.has('details')) {
      router.push(setNewPathWithoutDetails(query));
      dispatch(resetCurrentCard());
    }
  };

  return (
    <section className={'main-wrap'}>
      <div className="left-section" onClick={handleClickOutside}>
        <FormSearch />
        <hr />
        <Suspense fallback={<Loader />}>
          <DataView planets={response?.results} />
        </Suspense>
        <Paginator countPages={response?.count} />
        <FlyOut />
      </div>
      {planet && (
        <Suspense fallback={<Loader />}>
          <DetailsCard
            planet={planet}
            planetArrayDetails={planetArrayDetails}
          />
        </Suspense>
      )}
    </section>
  );
}
