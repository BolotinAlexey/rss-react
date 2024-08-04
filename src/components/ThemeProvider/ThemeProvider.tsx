import {
  ChangeEventHandler,
  createContext,
  ReactNode,
  useEffect,
  useState,
} from 'react';
import { LS_KEY_THEME } from '../../constants';

const ThemeContext = createContext<boolean>(false);
const ThemeUpdateContext = createContext<ChangeEventHandler<HTMLInputElement>>(
  () => {}
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<boolean>(false);

  useEffect(() => {
    const themeLS = localStorage.getItem(LS_KEY_THEME);
    if (themeLS) {
      setTheme(themeLS === 'true');
    }
  }, []);

  function toggleTheme() {
    const newTheme = !theme;
    localStorage.setItem(LS_KEY_THEME, newTheme.toString());
    setTheme(newTheme);
  }

  return (
    <ThemeUpdateContext.Provider value={toggleTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeUpdateContext.Provider>
  );
}

export { ThemeContext, ThemeUpdateContext, ThemeProvider };
