import { ChangeEvent, FormEvent } from 'react';
import './form.css';
import useLS from '../../hooks/useLS';
import React from 'react';

type Props = {
  onSubmitName: (name: string) => void;
};

export default function FormSearch({ onSubmitName }: Props) {
  const [name, setName, saveNameToLocalStorage] = useLS(onSubmitName);

  const submitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (name !== null) {
      onSubmitName(name);
      saveNameToLocalStorage();
    }
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
