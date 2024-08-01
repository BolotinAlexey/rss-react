import { AppProps } from 'next/app';
import '../style.css';

const MyApp = ({ Component, pageProps }: AppProps) => (
  <main>
    <Component {...pageProps} />
  </main>
);

export default MyApp;
