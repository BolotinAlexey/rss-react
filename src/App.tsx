import React from 'react';
import './App.css';
import PokemonForm from './components/PokemonForm/PokemonForm';
import { PokemonState } from './interfaces';

class App extends React.Component {
  state: PokemonState = {
    pokemonName: '',
  };
  onSubmitNameApp = (name: string) => {
    this.setState({ pokemonName: name });
  };
  render() {
    return (
      <>
        <h1>Pokemons</h1>
        <PokemonForm onSubmitName={this.onSubmitNameApp} />
      </>
    );
  }
}

export default App;
