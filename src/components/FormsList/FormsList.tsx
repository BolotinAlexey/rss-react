import { FormDataStore } from '../../types&interfaces/types';
import FormCard from '../FormCard';

interface IFormList {
  formsArray: FormDataStore[];
  title: string;
  isLast: boolean;
}

export default function FormList({ formsArray, title, isLast }: IFormList) {
  return (
    <section className="section">
      <h3 className="section__title">{`${title} forms`}</h3>
      <ul className="section__list">
        {formsArray.map((form, i) => (
          <li className="section__item" key={i}>
            {isLast && i === 0 && <p className="section__last">Last form</p>}
            <FormCard formData={form} isControl={title === 'Controled'} />
          </li>
        ))}
      </ul>
    </section>
  );
}
