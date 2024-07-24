import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Main';
import { loaderDetails } from './service/loaders';
import DetailsCard from './components/DetailsCard';
import ErrorPage from './pages/ErrorPage';
import NotFound from './pages/NotFound/NotFound';
import { useTheme } from './hooks/useTheme';
import styleTheme from './utils/styleTheme';

function App() {
  const [theme] = useTheme();
  const cls: string = theme ? 'dark' : 'light';

  const themeStyles = styleTheme(theme);

  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      // loader: loaderPageSearch,
      errorElement: <ErrorPage />,
      children: [
        {
          path: '/details/:namePlanet',
          element: <DetailsCard />,
          loader: loaderDetails,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return (
    <main style={themeStyles} className={cls}>
      <RouterProvider router={router} />
    </main>
  );
}

export default App;
