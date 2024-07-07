import React from 'react';
import './App.css';
import Form from './components/Form';
import DataView from './components/DataView';

interface IStateApp {
  name: string | null;
  isError: boolean;
}
class App extends React.Component {
  state: IStateApp = {
    name: null,
    isError: false,
  };

  onSubmitNameApp = (name: string) => {
    this.setState({ name });
  };

  errorHandler = () => {
    this.setState({ isError: true });
  };

  render() {
    if (this.state.isError) throw new Error('synthetic error');
    return (
      <>
        <div className="list__wrap">
          <h1>Planets</h1>
          <button className="btn-error" onClick={this.errorHandler}>
            Throw error
          </button>
        </div>
        <Form onSubmitName={this.onSubmitNameApp} />
        <hr />
        <DataView name={this.state.name} />
      </>
    );
  }
}

export default App;
