import { useState } from 'react';
import DataView from '../DataView';
import FormSearch from '../FormSearch';
import './main.css';

export default function Main() {
  const [name, setName] = useState<null | string>(null);
  const onSubmitNameApp = (name: string) => {
    setName(name);
  };

  return (
    <>
      <div className="list__wrap">
        <h1>Planets</h1>
      </div>
      <FormSearch onSubmitName={onSubmitNameApp} />
      <hr />
      <DataView name={name} />
    </>
  );
}
