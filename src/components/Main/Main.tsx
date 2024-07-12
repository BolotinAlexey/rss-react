import { useState } from 'react';
import DataView from '../DataView';
import FormSearch from '../FormSearch';
import './main.css';
import Paginator from '../Paginator';
import { useNavigation } from 'react-router-dom';

export default function Main() {
  const [name, setName] = useState<null | string>(null);
  const onSubmitNameApp = (name: string) => {
    setName(name);
  };
  const { state } = useNavigation();

  return (
    <>
      <div className="list__wrap">
        <h1>Planets</h1>
      </div>
      <FormSearch onSubmitName={onSubmitNameApp} />
      <hr />
      <DataView name={name} />
      {state === 'idle' && <Paginator />}
    </>
  );
}
