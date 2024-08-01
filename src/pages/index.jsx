import App from '../App';
import Header from '../components/Header';
import { ThemeProvider } from '../components/ThemeProvider';

export default function main() {
  <ThemeProvider>
    <Header />
    <App />
  </ThemeProvider>;
}
