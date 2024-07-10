import { ChangeEvent, FormEvent, useState } from 'react';
import './form.css';
import { LS_KEY } from '../../constants';

type Props = {
  onSubmitName: (name: string) => void;
};

export default function Form({ onSubmitName }: Props) {
  const [name, setName] = useState(localStorage.getItem(LS_KEY) ?? '');

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmitName(name);
    localStorage.setItem(LS_KEY, name);
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.trim().toLowerCase());
  };

  return (
    <section className="section section-form">
      <form className="form" onSubmit={submitHandler}>
        <input
          className="input"
          type="text"
          onChange={changeHandler}
          value={name}
          placeholder="Enter name"
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </form>
    </section>
  );
}
