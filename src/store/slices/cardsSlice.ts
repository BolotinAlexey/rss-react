import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IPlanet } from '../../interfaces';

export interface CardsState {
  selectedCards: IPlanet[];
}

const initialCardsState: CardsState = {
  selectedCards: [],
};

const cardsSlice = createSlice({
  name: 'cards',
  initialState: initialCardsState,
  reducers: {
    addCard(state, action: PayloadAction<IPlanet>) {
      state.selectedCards.push(action.payload);
    },
    removeCard(state, action: PayloadAction<string>) {
      state.selectedCards = state.selectedCards.filter(
        (card) => card.name !== action.payload
      );
    },
  },
});

export const { addCard, removeCard } = cardsSlice.actions;
export default cardsSlice.reducer;
