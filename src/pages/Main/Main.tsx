import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import FormCard from '../../components/FormCard';
import { FormDataStore } from '../../types&interfaces/types';
import './main.css';

export default function Main() {
  const uncontroledArr = useSelector(
    (state: RootState) => state.form.formDataUncontroled
  );
  return (
    <>
      <h2 className="page__title">Main Page Form</h2>
      <div className="page__wrap">
        <section className="section section-uncontroled">
          <ul className="section__list">
            {uncontroledArr.map((form: FormDataStore, i) => (
              <li className="section__item" key={i}>
                <FormCard formData={form} />
              </li>
            ))}
          </ul>
        </section>
        <section className="section section-controled"></section>
      </div>
    </>
  );
}
