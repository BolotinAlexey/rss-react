import React from 'react';
import './App.css';
import Form from './components/Form/Form';
import { State } from './interfaces';

class App extends React.Component {
  state: State = {
    name: '',
  };
  onSubmitNameApp = (name: string) => {
    this.setState({ name });
  };
  render() {
    return (
      <>
        <h1>Planets</h1>
        <Form onSubmitName={this.onSubmitNameApp} />
      </>
    );
  }
}

export default App;
