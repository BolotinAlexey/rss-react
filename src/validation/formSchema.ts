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
    .test(
      'no-spaces',
      'Password must not contain spaces',
      (value) => !value?.includes(' ')
    )
    .matches(/[A-Z]/, 'Password must contain an uppercase letter')
    .matches(/[a-z]/, 'Password must contain a lowercase letter')
    .matches(/\d/, 'Password must contain a number')
    .matches(/[@$!%*?&#]/, 'Password must contain a special character')
    .min(8, 'Password must be at least 8 characters long')
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
    .required(reqMessage)
    .test('chooseFile', "Don't choosen file.", (value) => {
      return value instanceof FileList && !!value.length;
    })
    .test('fileSize', 'File size should not exceed 1 MB', (value) => {
      if (!(value instanceof FileList) || value.length === 0) return true;
      return value[0].size <= 1024 * 1024;
    })
    .test(
      'fileFormat',
      'Unsupported format. Only JPEG and PNG are allowed',
      (value) => {
        if (!(value instanceof FileList) || value.length === 0) return true;
        return ['image/jpeg', 'image/png'].includes(value[0].type);
      }
    ),
});
