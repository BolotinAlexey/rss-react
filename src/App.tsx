import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './pages/Main';
import UncontrolledForm from './pages/UncontrolledForm';
import ReactHookForm from './pages/ReactHookForm';
import ErrorPage from './pages/ErrorPage';
import Root from './pages/Root';

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
          path: '/uncontroled',
          element: <UncontrolledForm />,
        },
        {
          path: '/controled',
          element: <ReactHookForm />,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
