import Header from '../Header';
import { ThemeProvider } from '../ThemeProvider';

export default function Layout({ children }: { children: JSX.Element }) {
  return (
    <ThemeProvider>
      <Header />
      <main>{children}</main>
    </ThemeProvider>
  );
}
