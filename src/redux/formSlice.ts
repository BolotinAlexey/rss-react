import { createSlice } from '@reduxjs/toolkit';
import { FormDataStore } from '../types&interfaces/types';

interface IStoreStateForm {
  formDataControled: FormDataStore[];
  formDataUncontroled: FormDataStore[];
}

const initialState: IStoreStateForm = {
  formDataControled: [],
  formDataUncontroled: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    setFormUncontroled(state, action) {
      state.formDataUncontroled = [
        action.payload,
        ...state.formDataUncontroled,
      ];
    },
    setFormControled: (state, action) => {
      state.formDataControled = [action.payload, ...state.formDataControled];
    },
  },
});

export const { setFormUncontroled, setFormControled } = formSlice.actions;
export default formSlice.reducer;
