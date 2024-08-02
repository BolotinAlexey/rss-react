import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import store from '../store';
import { ThemeProvider } from '../components/ThemeProvider';
import Header from '../components/Header';
import Main from '../components/Main';
import { getPage } from '../service/api';

export const getServerSideProps = async (context) => {
  const { params, query } = context;
  const { page, search } = query;
  const resp = await getPage(Number.parseInt(page ?? '1'), search ?? '');

  console.log('Параметры маршрута:', params);

  console.log('Query-параметры:', query);

  return { props: { resp } };
};

export default function index({ resp }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Header />
          <Main response={resp} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
