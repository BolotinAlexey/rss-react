import { ChangeEventHandler, createContext, ReactNode, useState } from 'react';

const ThemeContext = createContext<boolean>(false);
const ThemeUpdateContext = createContext<ChangeEventHandler<HTMLInputElement>>(
  () => {}
);

function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState(false);

  function toggleTheme() {
    setTheme((prev: boolean) => !prev);
  }

  return (
    <ThemeUpdateContext.Provider value={toggleTheme}>
      <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>
    </ThemeUpdateContext.Provider>
  );
}

export { ThemeContext, ThemeUpdateContext, ThemeProvider };
