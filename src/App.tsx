import React from 'react';
import './App.css';
import PokemonForm from './components/PokemonForm/PokemonForm';

class App extends React.Component {
  render() {
    return (
      <>
        <h1>Pokemons</h1>
        <PokemonForm />
      </>
    );
  }
}

export default App;
