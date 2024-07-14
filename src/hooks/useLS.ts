import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LS_KEY } from '../constants';
import { useLocation } from 'react-router-dom';

export default function useLS(
  onSubmitName: (name: string) => void
): [string, Dispatch<SetStateAction<string>>, () => void] {
  const [name, setName] = useState('');

  const { search } = useLocation();

  useEffect(() => {
    const q = new URLSearchParams(search).get('search');
    const lsWord = q !== null ? q : localStorage.getItem(LS_KEY) ?? '';
    setName(lsWord);
    onSubmitName(lsWord);
    return () => saveNameToLocalStorage();
  }, []);

  const saveNameToLocalStorage = () => {
    localStorage.setItem(LS_KEY, name);
  };

  return [name, setName, saveNameToLocalStorage];
}
