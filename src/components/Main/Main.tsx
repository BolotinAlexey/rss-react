import { useState } from 'react';
import DataView from '../DataView';
import FormSearch from '../FormSearch';
import './main.css';

export default function Main() {
  const [name, setName] = useState<null | string>(null);
  const [isError, setIsError] = useState(false);

  const onSubmitNameApp = (name: string) => {
    setName(name);
  };

  const errorHandler = () => {
    setIsError(true);
  };

  if (isError) throw new Error('synthetic error');
  return (
    <>
      <div className="list__wrap">
        <h1>Planets</h1>
        <button className="btn-error" onClick={errorHandler}>
          Throw error
        </button>
      </div>
      <FormSearch onSubmitName={onSubmitNameApp} />
      <hr />
      <DataView name={name} />
    </>
  );
}
