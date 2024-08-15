import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Main';
import UncontrolledForm from './components/UncontrolledForm';
import ReactHookForm from './components/ReactHookForm';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      // errorElement: <ErrorPage />,
      children: [
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
