import { configureStore } from '@reduxjs/toolkit';
import cardsSlice from './slices/cardsSlice';
import currentCardSlice from './slices/currentCardSlice';

const store = configureStore({
  reducer: {
    currentCard: currentCardSlice,
    cards: cardsSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
