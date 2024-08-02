import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LS_KEY } from '../constants';
import { NextRouter } from 'next/router';

export default function useLS(
  router: NextRouter
): [string, Dispatch<SetStateAction<string>>, () => void] {
  const [name, setName] = useState('');
  useEffect(() => {
    const { search } = router.query;
    const lsWord = search
      ? search.toString()
      : localStorage.getItem(LS_KEY) ?? '';
    setName(lsWord);
    return () => saveNameToLocalStorage();
  }, []);

  const saveNameToLocalStorage = () => {
    localStorage.setItem(LS_KEY, name);
  };

  return [name, setName, saveNameToLocalStorage];
}
