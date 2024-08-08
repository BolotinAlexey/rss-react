import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { IPlanet, IPlanetResponse, PlanetArrayDetails } from '../../interfaces';
import Loader from '../Loader';

const Main = dynamic(() => import('../Main'), {
  loading: () => <Loader />,
  /*
  !For reviewer:
  ?If you want to see an element of the Loader when loading the page from the server, set the flag: ssr: false,
  */
});

export default function IndexPage({
  response,
  planet,
  planetArrayDetails,
}: {
  response: IPlanetResponse;
  planet: IPlanet | null;
  planetArrayDetails: PlanetArrayDetails;
}) {
  return (
    <div>
      <Suspense fallback={<Loader />}>
        <Main
          response={response}
          planet={planet}
          planetArrayDetails={planetArrayDetails}
        />
      </Suspense>
    </div>
  );
}
