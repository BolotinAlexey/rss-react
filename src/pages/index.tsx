import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import store from '../store';
import { ThemeProvider } from '../components/ThemeProvider';
import Header from '../components/Header';
import Main from '../components/Main';
import { getDetails, getPage } from '../service/api';
import { IPlanet, IPlanetResponse } from '../interfaces';
import { GetServerSidePropsContext } from 'next';

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

  return { props: { resp, planet } };
};

export default function index({
  resp,
  planet,
}: {
  resp: IPlanetResponse;
  planet: IPlanet;
}) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Header />
          <Main response={resp} planet={planet} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
