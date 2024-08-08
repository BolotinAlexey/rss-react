import { ChangeEvent, FormEvent } from 'react';
import useLS from '../../hooks/useLS';
import { useRouter, useSearchParams } from 'next/navigation';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';
import { useDispatch } from 'react-redux';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';

export default function FormSearch() {
  const router = useRouter();
  const query = useSearchParams();
  const dispatch = useDispatch();
  const [name, setName, saveNameToLocalStorage] = useLS(query);

  const submitHandler = (e: FormEvent) => {
    e.preventDefault();

    if (query.has('details')) {
      router.push(setNewPathWithoutDetails(query));
      dispatch(resetCurrentCard());
    } else {
      router.push(`/?page=${query.get('page') ?? '1'}&search=${name ?? ''}`);
    }

    saveNameToLocalStorage();
  };

  const changeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value.trim().toLowerCase());
  };

  return (
    <section className="section section-form">
      <form className="form" data-testid="form" onSubmit={submitHandler}>
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
