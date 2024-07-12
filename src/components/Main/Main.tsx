import { useState } from 'react';
import DataView from '../DataView';
import FormSearch from '../FormSearch';
import './main.css';
import Paginator from '../Paginator';
import { Outlet, useNavigation } from 'react-router-dom';

export default function Main() {
  const [name, setName] = useState<null | string>(null);
  const onSubmitNameApp = (name: string) => {
    setName(name);
  };
  const { state } = useNavigation();

  return (
    <>
      <h1>Planets</h1>
      <FormSearch onSubmitName={onSubmitNameApp} />
      <hr />
      <DataView name={name} />
      {state === 'idle' && <Paginator />}
      <Outlet />
    </>
  );
}
