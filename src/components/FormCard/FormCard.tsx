import { FormField } from '../../types&interfaces/enums';
import { FormDataStore } from '../../types&interfaces/types';
import './formCard.css';

export default function FormCard({
  formData,
  isControl,
}: {
  formData: FormDataStore;
  isControl: boolean;
}) {
  if (!formData) return null;
  const formArray = isControl
    ? Object.keys(formData).reverse()
    : Object.keys(formData);

  return (
    <ul className="card">
      {formArray.map((field, i) => {
        if (field === FormField.picture)
          return (
            <li className="card__item" key={i}>
              <img className="card__img" src={formData[field]} alt="image" />
            </li>
          );
        return (
          <li key={i}>
            <p>
              <strong>{field}:</strong>{' '}
              {formData[field as keyof FormDataStore].toString()}
            </p>
          </li>
        );
      })}
    </ul>
  );
}
