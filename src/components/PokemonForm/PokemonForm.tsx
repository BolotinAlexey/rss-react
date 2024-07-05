import { ChangeEvent, Component, FormEvent } from 'react';
import './PokemonForm.modules.css';
import { PokemonState } from '../../interfaces';

type Props = {
  onSubmitName: (name: string) => void;
};

export default class PokemonForm extends Component<Props> {
  state: PokemonState = {
    pokemonName: '',
  };

  submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = this.state.pokemonName.replace(/\s+/g, '').toLowerCase();
    this.props.onSubmitName(name);
    this.setState({ pokemonName: '' });
  };

  changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ pokemonName: event.target.value });
  };

  render() {
    return (
      <form className="form" onSubmit={this.submitHandler}>
        <input
          className="input"
          type="text"
          onChange={this.changeHandler}
          value={this.state.pokemonName}
          placeholder="Enter pokemon name"
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
    );
  }
}
