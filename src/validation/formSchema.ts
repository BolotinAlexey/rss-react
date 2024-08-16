import { boolean, mixed, number, object, ref, string } from 'yup';

const reqMessage = 'This field is required';

export const formSchema = object().shape({
  name: string()
    .required(reqMessage)
    .matches(/^[A-Z]/, 'Name should start with an uppercase letter'),
  age: number().positive('Age must be positive').required(reqMessage),
  email: string()
    .email('Invalid email')
    .matches(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/, 'Invalid format email')
    .required(reqMessage),
  password: string()
    .min(8, 'Password must be at least 8 characters long')
    .matches(
      /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])/,
      'Password must contain an uppercase letter, a lowercase letter, a number, and a special character'
    )
    .required(reqMessage),
  confirmPassword: string()
    .oneOf([ref('password'), undefined], 'Passwords must match')
    .required(reqMessage),
  gender: string().oneOf(['male', 'female', 'other']).required(reqMessage),
  termsAccepted: boolean()
    .oneOf([true], 'Terms must be accepted')
    .required(reqMessage),
  country: string().required(reqMessage),
  picture: mixed()
    .required('Picture is required')
    .test('fileSize', 'File size should not exceed 1 MB', (value) => {
      if (!(value instanceof File)) return false;
      return value && value.size <= 1024 * 1024;
    })
    .test(
      'fileFormat',
      'Unsupported format. Only JPEG and PNG are allowed',
      (value) => {
        if (!(value instanceof File)) return false;
        return value && ['image/jpeg', 'image/png'].includes(value.type);
      }
    ),
});
