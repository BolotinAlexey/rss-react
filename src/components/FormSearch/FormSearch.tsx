import { ChangeEvent, FormEvent } from 'react';
import useLS from '../../hooks/useLS';
import { useRouter } from 'next/router';

export default function FormSearch() {
  const router = useRouter();
  const [name, setName, saveNameToLocalStorage] = useLS(router);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();
    const currentQuery = { ...router.query, search: name, page: 1 };
    router.push({ pathname: router.pathname, query: currentQuery });

    saveNameToLocalStorage();
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.trim().toLowerCase());
  };

  return (
    <section className="section section-form">
      <form className="form" onSubmit={submitHandler}>
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
      </form>
    </section>
  );
}
