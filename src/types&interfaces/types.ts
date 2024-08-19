type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: 'male' | 'female' | 'other';
  termsAccepted: boolean;
  country: string;
  picture: FileList | undefined;
};

type FormDataStore = Omit<FormData, 'picture'> & { picture: string };

export type { FormData, FormDataStore };
