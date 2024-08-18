import { createSlice } from '@reduxjs/toolkit';
import { FormDataStore } from '../types&interfaces/types';

interface IStoreStateForm {
  formDataControlled: FormDataStore[];
  formDataUncontrolled: FormDataStore[];
}

const initialState: IStoreStateForm = {
  formDataControlled: [],
  formDataUncontrolled: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormUncontrolled(state, action) {
      state.formDataUncontrolled = [
        action.payload,
        ...state.formDataUncontrolled,
      ];
    },
    setFormControlled: (state, action) => {
      state.formDataControlled = [action.payload, ...state.formDataControlled];
    },
  },
});

export const { setFormUncontrolled, setFormControlled } = formSlice.actions;
export default formSlice.reducer;
