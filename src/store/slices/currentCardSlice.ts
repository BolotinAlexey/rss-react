import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlanet } from '../../interfaces';

export interface CurrentCardState {
  currentCard: IPlanet | null;
}

const initialCurrentCardState: CurrentCardState = {
  currentCard: null,
};

const currentCardSlice = createSlice({
  name: 'currentCard',
  initialState: initialCurrentCardState,
  reducers: {
    setCurrentCard(state, action: PayloadAction<IPlanet | null>) {
      state.currentCard = action.payload;
    },
    resetCurrentCard(state) {
      state.currentCard = null;
    },
  },
});

export const { setCurrentCard, resetCurrentCard } = currentCardSlice.actions;
export default currentCardSlice.reducer;
