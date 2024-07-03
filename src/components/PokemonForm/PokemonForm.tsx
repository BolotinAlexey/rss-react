import { ChangeEvent, Component, FormEvent } from 'react';
import './PokemonForm.modules.css';

export default class PokemonForm extends Component {
  state = {
    name: '',
  };

  submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(this.state.name.replace(/\s+/g, '').toLowerCase());
    this.setState({ name: '' });
  };

  changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value);
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <form className="form" onSubmit={this.submitHandler}>
        <input
          className="input"
          type="text"
          onChange={this.changeHandler}
          value={this.state.name}
          placeholder="Enter pokemon name"
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
    );
  }
}
