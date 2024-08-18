import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import { formSchema } from '../../validation/formSchema';
import { FormData, FormDataStore } from '../../types&interfaces/types';
import { useNavigate } from 'react-router-dom';
import { setFormControlled } from '../../redux/formSlice';
import { Controll, FormField } from '../../types&interfaces/enums';
import Progress from '../../components/Progress';
import { useEffect, useState } from 'react';
import checkPassword from '../../utils/checkPassword';

export default function ReactHookForm() {
  const dispatch = useDispatch();
  const countries = useSelector((state: RootState) => state.countries);
  const navigate = useNavigate();
  const [deg, setDeg] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
    reset,
  } = useForm({
    resolver: yupResolver(formSchema),
    mode: 'onChange',
  });

  const onSubmit = async (data: FormData) => {
    try {
      const picture = data.picture?.[0];
      const reader = new FileReader();

      if (picture) {
        reader.onloadend = () => {
          const base64String = reader.result?.toString() as string;
          const formDataStore: FormDataStore = {
            ...data,
            picture: base64String,
          };
          dispatch(setFormControlled(formDataStore));
        };

        reader.readAsDataURL(picture);
      } else {
        dispatch(setFormControlled({ ...data, picture: '' }));
      }

      reset();
      navigate('/', { state: { from: Controll.controlled } });
    } catch (err) {
      console.warn('Error processing the form:', err);
    }
  };

  useEffect(() => {
    const subscription = watch(({ password }, { name }) => {
      if (name === FormField.password) {
        checkPassword(password || '', setDeg);
      }
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <>
      <h2 className="page__title">Controlled Form</h2>
      <form
        className="form form-controlled"
        onSubmit={handleSubmit((data) => onSubmit(data as FormData))}
        autoComplete="on"
      >
        <label htmlFor="name">
          Name:
          <input id="name" type="text" {...register('name')} />
          <span className="error">{errors.name?.message}</span>
        </label>

        <label htmlFor="age">
          Age:
          <input id="age" type="number" {...register('age')} />
          <span className="error">{errors.age?.message}</span>
        </label>

        <label htmlFor="email">
          Email:
          <input id="email" type="text" {...register('email')} />
          <span className="error">{errors.email?.message}</span>
        </label>

        <label htmlFor="password">
          Password:
          <input id="password" type="password" {...register('password')} />
          <span className="error password">{errors.password?.message}</span>
          <Progress deg={deg} />
        </label>

        <label htmlFor="confirmPassword">
          Confirm Password:
          <input
            id="confirmPassword"
            type="password"
            {...register('confirmPassword')}
          />
          <span className="error password">
            {errors.confirmPassword?.message}
          </span>
        </label>

        <label htmlFor="gender">
          Gender:
          <select id="gender" {...register('gender')}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          <span className="error">{errors.gender?.message}</span>
        </label>

        <label htmlFor="terms">
          Accept Terms and Conditions:
          <input id="terms" type="checkbox" {...register('termsAccepted')} />
          <span className="error">{errors.termsAccepted?.message}</span>
        </label>

        <label htmlFor="picture">
          Upload Picture:
          <input id="picture" type="file" {...register('picture')} />
          <span className="error">{errors.picture?.message}</span>
        </label>

        <label htmlFor="country">
          Country:
          <input id="country" list="country-list" {...register('country')} />
          <datalist id="country-list">
            {countries.map((country, index) => (
              <option key={index} value={country} />
            ))}
          </datalist>
          <span className="error">{errors.country?.message}</span>
        </label>

        <button type="submit" disabled={!isValid}>
          Submit
        </button>
      </form>
    </>
  );
}
