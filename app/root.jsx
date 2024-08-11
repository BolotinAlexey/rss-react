import {
  Links,
  Meta,
  Outlet,
  Scripts,
  useLocation,
  useSearchParams,
} from '@remix-run/react';
// import { useState } from 'react';
// import DataView from '../src/components/DataView';
// import FormSearch from '../src/components/FormSearch';
// import Paginator from '../src/components/Paginator';
import { useNavigate } from '@remix-run/react';
// import { useLocation, useNavigate } from 'react-router-dom';
// import { useDispatch } from 'react-redux';
// import { resetCurrentCard } from '../../store/slices/currentCardSlice';
// import FlyOut from '../src/components/FlyOut/FlyOut';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { ThemeProvider } from '../src/components/ThemeProvider';

export default function App() {
  // const [name, setName] = useState<null | string>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams /* setSearchParams */] = useSearchParams();
  console.log(searchParams);

  // const location = useLocation();
  // const dispatch = useDispatch();

  // const onSubmitNameApp = (name: string) => {
  //   setName(name);
  // };

  const handleClickOutside = (event) => {
    const { target } = event;
    if (!(target instanceof HTMLElement)) return;
    if (location.pathname.includes('/details/')) {
      navigate(`/${location.search}`, { replace: true });
    }
    // dispatch(resetCurrentCard());
  };
  return (
    <html>
      <head>
        <link rel="icon" href="data:image/x-icon;base64,AA" />
        <Meta />
        <Links />
      </head>
      <Provider store={store}>
        <ThemeProvider>
          <body>
            <section className="main-wrap">
              <div className="left-section" onClick={handleClickOutside}>
                <h1>Planets</h1>
                {/* <FormSearch  onSubmitName={onSubmitNameApp} /> */}
                <hr />
                {/* <DataView name={name} /> */}
                {/* <Paginator /> */}
                {/* <FlyOut /> */}
              </div>
              <div className="right-section">
                <Outlet />
              </div>
            </section>

            <Scripts />
          </body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}
