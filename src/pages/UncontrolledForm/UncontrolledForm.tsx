import { useRef, FormEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ValidationError } from 'yup';
import { RootState } from '../../redux/store';
import { formSchema } from '../../validation/formSchema';
import { setFormUncontrolled } from '../../redux/formSlice';
import { FormData, FormDataStore } from '../../types&interfaces/types';
import { useNavigate } from 'react-router-dom';
import { Controll } from '../../types&interfaces/enums';
import checkPassword from '../../utils/checkPassword';
import Progress from '../../components/Progress';

export default function UncontrolledForm() {
  const dispatch = useDispatch();
  const countries = useSelector(
    (state: RootState) => state.countries.countries
  );
  const navigate = useNavigate();
  const [deg, setDeg] = useState(0);

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

    const formData: FormData = {
      name: nameRef.current?.value ?? '',
      age: +(ageRef.current?.value ?? '0'),
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
      confirmPassword: confirmPasswordRef.current?.value ?? '',
      gender: (genderRef.current?.value ?? 'male') as
        | 'male'
        | 'female'
        | 'other',
      termsAccepted: termsRef.current?.checked ?? false,
      country: countryRef.current?.value ?? '',
      picture: pictureRef.current?.files ?? undefined,
    };

    clearErrors();

    try {
      await formSchema.validate(formData, { abortEarly: false });

      const picture = pictureRef.current?.files?.[0];
      const reader = new FileReader();

      if (picture) {
        reader.onloadend = () => {
          const base64String = reader.result?.toString() as string;
          const formDataStore: FormDataStore = {
            ...formData,
            picture: base64String,
          };
          dispatch(setFormUncontrolled(formDataStore));
        };

        reader.readAsDataURL(picture);
        navigate('/', { state: { from: Controll.uncontrolled } });
      } else {
        dispatch(setFormUncontrolled({ ...formData, picure: '' }));
      }
    } catch (err) {
      if (err instanceof ValidationError) {
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
          if (error.path === 'picture')
            pictureErrorRef.current!.textContent = error.message;
        });
      } else {
        console.warn(err);
      }
    }
  };

  return (
    <>
      <h2 className="page__title">Uncontrolled Form</h2>
      <form
        className="form form-uncontrolled"
        onSubmit={handleSubmit}
        autoComplete="on"
      >
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
          <input
            id="password"
            type="password"
            ref={passwordRef}
            onChange={() =>
              checkPassword(passwordRef.current?.value || '', setDeg)
            }
          />
          <span ref={passwordErrorRef} className="error"></span>
          <Progress deg={deg} />
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
