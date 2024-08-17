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
        ...state.formDataUncontroled,
        action.payload,
      ];
    },
    setFormControled: (state, action) => {
      state.formDataControled = [...state.formDataControled, action.payload];
    },
  },
});

export const { setFormUncontroled, setFormControled } = formSlice.actions;
export default formSlice.reducer;
