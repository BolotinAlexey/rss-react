import { json, Links, Meta, Scripts, useRouteError } from '@remix-run/react';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { ThemeProvider } from '../src/components/ThemeProvider';
import { getPage } from '../src/service/api';
import Main from '../src/components/Main';
import { LoaderFunctionArgs } from '@remix-run/node';
import Header from '../src/components/Header';
import './index.css';

export default function App() {
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
            <Header />
            <Main />
            <Scripts />
          </body>
        </ThemeProvider>
      </Provider>
    </html>
  );
}

export const loader = async (req: LoaderFunctionArgs) => {
  const sp = new URL(req.request.url).searchParams;

  const res = await getPage(sp.get('page') ?? '1', sp.get('search') ?? '');
  return json({ res });
};

export function ErrorBoundary() {
  const error = useRouteError();
  console.error(error);
  return (
    <html>
      <head>
        <title>Oh no!</title>
        <Meta />
        <Links />
      </head>
      <body>
        <p>Occur error!</p>
        <a href="/?page=1&search=">Go Home</a>
        <Scripts />
      </body>
    </html>
  );
}
