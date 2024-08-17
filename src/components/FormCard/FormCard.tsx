import { FormField } from '../../types&interfaces/enums';
import { FormDataStore } from '../../types&interfaces/types';
import './formCard.css';

export default function FormCard({ formData }: { formData: FormDataStore }) {
  if (!formData) return null;

  return (
    <div className="card">
      {Object.keys(formData).map((field, i) => {
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
    </div>
  );
}
