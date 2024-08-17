import { FormDataStore } from '../../types&interfaces/types';

function SummaryPage({ formData }: { formData: FormDataStore }) {
  if (!formData) return null;
  const { name, age, email, gender, country, picture } = formData;

  return (
    <div>
      <h1>Form Summary</h1>
      <p>
        <strong>Name:</strong> {name}
      </p>
      <p>
        <strong>Age:</strong> {age}
      </p>
      <p>
        <strong>Email:</strong> {email}
      </p>
      <p>
        <strong>Gender:</strong> {gender}
      </p>
      <p>
        <strong>Country:</strong> {country}
      </p>
      {picture && (
        <div>
          <strong>Uploaded Picture:</strong>
          <img
            src={picture}
            alt="Uploaded"
            style={{ width: '200px', height: 'auto' }}
          />
        </div>
      )}
    </div>
  );
}

export default SummaryPage;
