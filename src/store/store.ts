import { configureStore } from '@reduxjs/toolkit';
// import { apiSW } from '../service/apiRtk';
import cardsSlice from './slices/cardsSlice';
import currentCardSlice from './slices/currentCardSlice';

const store = configureStore({
  reducer: {
    // [apiSW.reducerPath]: apiSW.reducer,
    currentCard: currentCardSlice,
    cards: cardsSlice,
  },
  // middleware: (getDefaultMiddleware) =>
  //   getDefaultMiddleware().concat(apiSW.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
