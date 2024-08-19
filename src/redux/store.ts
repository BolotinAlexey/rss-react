import { configureStore } from '@reduxjs/toolkit';
import formReducer from './formSlice';
import countriesReducer from './countriesSlice';

const store = configureStore({
  reducer: {
    countries: countriesReducer,
    form: formReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
