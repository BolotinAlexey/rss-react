import { useRef, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import { RootState } from '../../redux/store';
import { formSchema } from '../../validation/formSchema';
import { setUploadedUncontroledImage } from '../../redux/formSlice';

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

  const nameErrorRef = useRef<HTMLSpanElement>(null);
  const ageErrorRef = useRef<HTMLSpanElement>(null);
  const emailErrorRef = useRef<HTMLSpanElement>(null);
  const passwordErrorRef = useRef<HTMLSpanElement>(null);
  const confirmPasswordErrorRef = useRef<HTMLSpanElement>(null);
  const genderErrorRef = useRef<HTMLSpanElement>(null);
  const termsErrorRef = useRef<HTMLSpanElement>(null);
  const pictureErrorRef = useRef<HTMLSpanElement>(null);
  const countryErrorRef = useRef<HTMLSpanElement>(null);

  const clearErrors = () => {
    nameErrorRef.current!.textContent = '';
    ageErrorRef.current!.textContent = '';
    emailErrorRef.current!.textContent = '';
    passwordErrorRef.current!.textContent = '';
    confirmPasswordErrorRef.current!.textContent = '';
    genderErrorRef.current!.textContent = '';
    termsErrorRef.current!.textContent = '';
    pictureErrorRef.current!.textContent = '';
    countryErrorRef.current!.textContent = '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = {
      name: nameRef.current?.value ?? '',
      age: parseInt(ageRef.current?.value ?? '0', 10),
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
      gender: genderRef.current?.value ?? '',
      termsAccepted: termsRef.current?.checked ?? false,
      country: countryRef.current?.value ?? '',
    };

    clearErrors();

    try {
      await formSchema.validate(formData, { abortEarly: false });

      const picture = pictureRef.current?.files?.[0];

      if (picture) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const base64String = reader.result?.toString();
          dispatch(setUploadedUncontroledImage(base64String));
        };
        reader.readAsDataURL(picture);
      }

      console.log('Form Submitted:', formData);
      console.log('Form submitted successfully!');
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        err.inner.forEach((error) => {
          if (error.path === 'name')
            nameErrorRef.current!.textContent = error.message;
          if (error.path === 'age')
            ageErrorRef.current!.textContent = error.message;
          if (error.path === 'email')
            emailErrorRef.current!.textContent = error.message;
          if (error.path === 'password')
            passwordErrorRef.current!.textContent = error.message;
          if (error.path === 'confirmPassword')
            confirmPasswordErrorRef.current!.textContent = error.message;
          if (error.path === 'gender')
            genderErrorRef.current!.textContent = error.message;
          if (error.path === 'termsAccepted')
            termsErrorRef.current!.textContent = error.message;
          if (error.path === 'country')
            countryErrorRef.current!.textContent = error.message;
        });
      }
    }
  };

  return (
    <>
      <h2 className="section__title">Uncontrolled Form</h2>
      <form className="form form-uncontroled" onSubmit={handleSubmit}>
        <label htmlFor="name">
          Name:
          <input id="name" type="text" ref={nameRef} />
          <span ref={nameErrorRef} className="error"></span>
        </label>

        <label htmlFor="age">
          Age:
          <input id="age" type="number" ref={ageRef} />
          <span ref={ageErrorRef} className="error"></span>
        </label>

        <label htmlFor="email">
          Email:
          <input id="email" type="text" ref={emailRef} />
          <span ref={emailErrorRef} className="error"></span>
        </label>

        <label htmlFor="password">
          Password:
          <input id="password" type="password" ref={passwordRef} />
          <span ref={passwordErrorRef} className="error"></span>
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            id="confirmPassword"
            type="password"
            ref={confirmPasswordRef}
          />
          <span ref={confirmPasswordErrorRef} className="error"></span>
        </label>

        <label htmlFor="gender">
          Gender:
          <select id="gender" ref={genderRef}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <span ref={genderErrorRef} className="error"></span>
        </label>

        <label htmlFor="terms">
          Accept Terms and Conditions:
          <input id="terms" type="checkbox" ref={termsRef} />
          <span ref={termsErrorRef} className="error"></span>
        </label>

        <label htmlFor="picture">
          Upload Picture:
          <input id="picture" type="file" ref={pictureRef} />
          <span ref={pictureErrorRef} className="error"></span>
        </label>

        <label htmlFor="country">
          Country:
          <input id="country" list="country-list" ref={countryRef} />
          <datalist id="country-list">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          <span ref={countryErrorRef} className="error"></span>
        </label>

        <button type="submit">Submit</button>
      </form>
    </>
  );
}

export default UncontrolledForm;
