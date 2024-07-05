import { ChangeEvent, Component, FormEvent } from 'react';
import './form.css';
import { State } from '../../interfaces';

type Props = {
  onSubmitName: (name: string) => void;
};

export default class Form extends Component<Props> {
  state: State = {
    name: '',
  };

  submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = this.state.name.replace(/\s+/g, '').toLowerCase();
    this.props.onSubmitName(name);
    this.setState({ name: '' });
  };

  changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
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
          placeholder="Enter name"
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
    );
  }
}
