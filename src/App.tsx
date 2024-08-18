import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import UncontrolledForm from './pages/UncontrolledForm';
import ReactHookForm from './pages/ReactHookForm';
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';
import './App.css';
import NotFound from './pages/NotFound';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Root />,
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Main />,
        },
        {
          path: '/uncontrolled',
          element: <UncontrolledForm />,
        },
        {
          path: '/controlled',
          element: <ReactHookForm />,
        },
      ],
    },
    {
      path: '*',
      element: <NotFound />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
