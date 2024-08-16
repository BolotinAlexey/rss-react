import { useRef, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { setUploadedUncontroledImage } from '../../redux/formSlice';
import { FormData } from '../../types&interfaces/types';

function UncontrolledForm() {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.form.countries);

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const termsRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const name = nameRef.current?.value ?? '';
    const age = parseInt(ageRef.current?.value ?? '0', 10);
    const email = emailRef.current?.value ?? '';
    const password = passwordRef.current?.value ?? '';
    const confirmPassword = confirmPasswordRef.current?.value ?? '';
    const gender = genderRef.current?.value ?? '';
    const termsAccepted = termsRef.current?.checked ?? false;
    const picture = pictureRef.current?.files?.[0];
    const country = countryRef.current?.value ?? '';

    if (!/^[A-Z]/.test(name)) {
      console.log('Name should start with an uppercase letter.');
      return;
    }

    if (isNaN(age) || age <= 0) {
      console.log('Age should be a positive number.');
      return;
    }

    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      console.log('Please enter a valid email address.');
      return;
    }

    const passwordStrength =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;
    if (!passwordStrength.test(password)) {
      console.log(
        'Password must contain at least 1 number, 1 uppercase letter, 1 lowercase letter, and 1 special character.'
      );
      return;
    }

    if (password !== confirmPassword) {
      console.log('Passwords do not match.');
      return;
    }

    if (!termsAccepted) {
      console.log('You must accept the Terms and Conditions.');
      return;
    }

    if (picture) {
      const allowedExtensions = /(\.jpg|\.jpeg|\.png)$/i;
      if (!allowedExtensions.exec(picture.name)) {
        console.log('Please upload a picture in JPEG or PNG format.');
        return;
      }

      if (picture.size > 2 * 1024 * 1024) {
        console.log('File size should not exceed 2 MB.');
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        dispatch(setUploadedUncontroledImage(base64String));
      };
      reader.readAsDataURL(picture);
    }

    const formData: FormData = {
      name,
      age,
      email,
      password,
      confirmPassword,
      gender,
      termsAccepted,
      country,
    };

    console.log('Form Submitted:', formData);
    console.log('Form submitted successfully!');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input id="name" type="text" ref={nameRef} required />

      <label htmlFor="age">Age:</label>
      <input id="age" type="number" ref={ageRef} required />

      <label htmlFor="email">Email:</label>
      <input id="email" type="email" ref={emailRef} required />

      <label htmlFor="password">Password:</label>
      <input id="password" type="password" ref={passwordRef} required />

      <label htmlFor="confirmPassword">Confirm Password:</label>
      <input
        id="confirmPassword"
        type="password"
        ref={confirmPasswordRef}
        required
      />

      <label htmlFor="gender">Gender:</label>
      <select id="gender" ref={genderRef} required>
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="other">Other</option>
      </select>

      <label htmlFor="terms">Accept Terms and Conditions:</label>
      <input id="terms" type="checkbox" ref={termsRef} required />

      <label htmlFor="picture">Upload Picture:</label>
      <input id="picture" type="file" ref={pictureRef} required />

      <label htmlFor="country">Country:</label>
      <input id="country" list="country-list" ref={countryRef} required />
      <datalist id="country-list">
        {countries.map((country, index) => (
          <option key={index} value={country} />
        ))}
      </datalist>

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
