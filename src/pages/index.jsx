import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import store from '../store';
import { ThemeProvider } from '../components/ThemeProvider';
import Header from '../components/Header';
import Main from '../components/Main';
import { getPage } from '../service/api';

export const getServerSideProps = async (context) => {
  const { params, query } = context;
  // const search = router.query?.search?.toString() || '';
  // const page = Number.parseInt(router.query?.page?.toString() || '1');
  // console.log('page' + page);
  // const resp = await getPage(page, search);
  const { page, search } = query;
  const resp = await getPage(Number.parseInt(page ?? '1'), search ?? '');
  const data = resp.results;

  // Пример использования параметров маршрута
  console.log('Параметры маршрута:', params);

  // Пример использования query-параметров
  console.log('Query-параметры:', query);

  // // Пример использования объекта req (объект запроса)
  // console.log('Объект запроса:', req);

  // // Пример использования объекта res (объект ответа)
  // console.log('Объект ответа:', res);
  return { props: { data } };
};

export default function index({ data }) {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <ThemeProvider>
          <Header />
          <Main data={data} />
        </ThemeProvider>
      </Provider>
    </ErrorBoundary>
  );
}
