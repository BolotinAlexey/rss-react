import { ChangeEventHandler, createContext, ReactNode, useState } from 'react';
import { LS_KEY_THEME } from '../../constants';

const ThemeContext = createContext<boolean>(false);
const ThemeUpdateContext = createContext<ChangeEventHandler<HTMLInputElement>>(
  () => {}
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const themeLS = localStorage.getItem(LS_KEY_THEME);
  const [theme, setTheme] = useState(themeLS === 'true' ? true : false);

  function toggleTheme() {
    localStorage.setItem(LS_KEY_THEME, (!theme).toString());
    setTheme((prev: boolean) => !prev);
  }

  return (
    <ThemeUpdateContext.Provider value={toggleTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeUpdateContext.Provider>
  );
}

export { ThemeContext, ThemeUpdateContext, ThemeProvider };
