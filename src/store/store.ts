import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './slices/cardsSlice';
import currentCardSlice from './slices/currentCardSlice';
import loadingSlice from './slices/loadingSlice';

const store = configureStore({
  reducer: {
    currentCard: currentCardSlice,
    cards: cardsSlice,
    loading: loadingSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
