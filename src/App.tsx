import { useState } from 'react';
import './App.css';
import Form from './components/Form';
import DataView from './components/DataView';

function App() {
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
      <Form onSubmitName={onSubmitNameApp} />
      <hr />
      <DataView name={name} />
    </>
  );
}

export default App;
