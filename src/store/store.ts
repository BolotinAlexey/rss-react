import { configureStore } from '@reduxjs/toolkit';
import { apiSW } from '../service/apiRtk';
import { setupListeners } from '@reduxjs/toolkit/query';

const store = configureStore({
  reducer: {
    [apiSW.reducerPath]: apiSW.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSW.middleware),
});
setupListeners(store.dispatch);

export default store;
