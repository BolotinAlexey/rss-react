import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LS_KEY } from '../constants';

export default function useLS(
  onSubmitName: (name: string) => void
): [string, Dispatch<SetStateAction<string>>, () => void] {
  const [name, setName] = useState('');

  useEffect(() => {
    const lsWord = localStorage.getItem(LS_KEY) ?? '';
    setName(lsWord);
    onSubmitName(lsWord);
  }, []);

  const saveNameToLocalStorage = () => {
    localStorage.setItem(LS_KEY, name);
  };

  return [name, setName, saveNameToLocalStorage];
}
