import { FormDataStore } from '../../types&interfaces/types';
import FormCard from '../FormCard';

interface IFormList {
  formsArray: FormDataStore[];
  title: string;
}

export default function FormList({ formsArray, title }: IFormList) {
  return (
    <section className="section">
      <h3 className="section__title">{title}</h3>
      <ul className="section__list">
        {formsArray.map((form, i) => (
          <li className="section__item" key={i}>
            <FormCard formData={form} />
          </li>
        ))}
      </ul>
    </section>
  );
}
