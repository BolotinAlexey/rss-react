import { ChangeEvent, Component, FormEvent } from 'react';
import './form.css';
import { State } from '../../interfaces';
import { LS_KEY } from '../../constants';

type Props = {
  onSubmitName: (name: string) => void;
};

export default class Form extends Component<Props> {
  state: State = {
    name: '',
  };

  componentDidMount(): void {
    const initWord = localStorage.getItem(LS_KEY) ?? '';
    this.setState({ name: initWord });
    this.props.onSubmitName(initWord);
  }

  submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = this.state.name.trim().toLowerCase();
    this.props.onSubmitName(name);
    localStorage.setItem(LS_KEY, name);
  };

  changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    this.setState({ name: event.target.value });
  };

  render() {
    return (
      <section className="section section-form">
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
      </section>
    );
  }
}
