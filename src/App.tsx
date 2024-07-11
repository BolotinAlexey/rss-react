import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Main from './components/Main';

function App() {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Main />,
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
