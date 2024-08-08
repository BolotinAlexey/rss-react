import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { LS_KEY } from '../constants';
import { ReadonlyURLSearchParams } from 'next/navigation';

export default function useLS(
  query: ReadonlyURLSearchParams
): [string, Dispatch<SetStateAction<string>>, () => void] {
  const [name, setName] = useState<string>('');

  useEffect(() => {
    const search = query.get('search');
    const lsWord = search || localStorage.getItem(LS_KEY) || '';
    setName(lsWord);
  }, [query]);

  const saveNameToLocalStorage = () => {
    localStorage.setItem(LS_KEY, name);
  };

  return [name, setName, saveNameToLocalStorage];
}
