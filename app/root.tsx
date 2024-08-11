import { json, Links, Meta, Scripts } from '@remix-run/react';
import { Provider } from 'react-redux';
import store from '../src/store/store';
import { ThemeProvider } from '../src/components/ThemeProvider';
import { getPage } from '../src/service/api';
import Main from '../src/components/Main';
import { LoaderFunctionArgs } from '@remix-run/node';

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
