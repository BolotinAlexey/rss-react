import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import store from '../store';
import { getDetails, getPage } from '../service/api';
import { IPlanet, IPlanetResponse, PlanetArrayDetails } from '../interfaces';
import { GetServerSidePropsContext } from 'next';
import transformPropsArrayToString from '../utils/transformPropsArrayToString';
import IndexPage from '../components/IndexPage/IndexPage';

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const { query } = context;
  const { page, search, details } = query;
  const resp = await getPage(
    Number.parseInt(page?.toString() ?? '1'),
    search?.toString() ?? ''
  );
  const planet: IPlanet | null = details
    ? await getDetails(details.toString() ?? '1')
    : null;

  const planetArrayDetails: PlanetArrayDetails = {
    filmTitles: '',
    residentNames: '',
  };
  if (planet && planet?.films) {
    planetArrayDetails.filmTitles = await transformPropsArrayToString(
      planet.films,
      'title'
    );
  }

  if (planet && planet?.residents) {
    planetArrayDetails.residentNames = await transformPropsArrayToString(
      planet.residents,
      'name'
    );
  }

  return { props: { resp, planet, planetArrayDetails } };
};

export default function index({
  resp,
  planet,
  planetArrayDetails,
}: {
  resp: IPlanetResponse;
  planet: IPlanet;
  planetArrayDetails: PlanetArrayDetails;
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <IndexPage
          response={resp}
          planet={planet}
          planetArrayDetails={planetArrayDetails}
        />
      </Provider>
    </ErrorBoundary>
  );
}
