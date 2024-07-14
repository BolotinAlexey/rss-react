import { ChangeEvent } from 'react';
import './form.css';
import useLS from '../../hooks/useLS';
import { Form } from 'react-router-dom';

type Props = {
  onSubmitName: (name: string) => void;
};

export default function FormSearch({ onSubmitName }: Props) {
  const [name, setName, saveNameToLocalStorage] = useLS(onSubmitName);

  const submitHandler = () => {
    onSubmitName(name);
    saveNameToLocalStorage();
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.trim().toLowerCase());
  };

  return (
    <section className="section section-form">
      <Form className="form" onSubmit={submitHandler}>
        <input
          className="input"
          type="search"
          onChange={changeHandler}
          value={name}
          name="search"
          placeholder="Enter name"
        />
        <button className="submit-button" type="submit">
          Search
        </button>
      </Form>
    </section>
  );
}
