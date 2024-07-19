import { ChangeEventHandler, useContext } from 'react';
import { ThemeContext, ThemeUpdateContext } from '../components/ThemeProvider';

export function useTheme(): [boolean, ChangeEventHandler<HTMLInputElement>] {
  return [useContext(ThemeContext), useContext(ThemeUpdateContext)];
}
