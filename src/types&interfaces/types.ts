type FormData = {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  termsAccepted: boolean;
  country: string;
  picture: null | FileList;
};

type FormDataStore = Omit<FormData, 'picture'> & { picture: string };

export type { FormData, FormDataStore };
