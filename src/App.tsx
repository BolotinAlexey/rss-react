import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Main';
import { loaderPageSearch } from './service/loaderPageSearch';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
      loader: loaderPageSearch,
      // children: [
      //   {
      //     // path: '?page=${page}&search=${search}',
      //     element: <Main />,
      //   },
      // ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
