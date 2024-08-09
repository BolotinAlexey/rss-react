import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { describe, it, expect, vi, Mock } from 'vitest';
import Card from './Card';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  initialState,
  mockPlanet1,
  mockSearchParams,
} from '../../tests/mockData';
import cardsSlice, {
  CardsState,
  addCard,
  removeCard,
} from '../../store/slices/cardsSlice';
import currentCardSlice, {
  CurrentCardState,
} from '../../store/slices/currentCardSlice';

vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

const initialCurrentCardState: CurrentCardState = {
  currentCard: null,
};

(useRouter as Mock).mockReturnValue({ push: vi.fn() });
(useSearchParams as Mock).mockReturnValue(mockSearchParams);

const renderWithStore = (initialState: {
  cards: CardsState;
  currentCard: CurrentCardState;
}) => {
  const store = configureStore({
    reducer: {
      currentCard: currentCardSlice,
      cards: cardsSlice,
    },
    preloadedState: initialState,
  });

  return render(
    <Provider store={store}>
      <Card {...mockPlanet1} />
    </Provider>
  );
};

describe('Card component', () => {
  it('should render correctly', () => {
    renderWithStore(initialState);

    expect(screen.getByText('Tatooine')).toBeInTheDocument();
    expect(screen.getByLabelText('add to favorites')).toBeInTheDocument();
  });

  it('should add a card when checkbox is checked', () => {
    const store = configureStore({
      reducer: {
        currentCard: currentCardSlice,
        cards: cardsSlice,
      },
      preloadedState: initialState,
    });

    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <Card {...mockPlanet1} />
      </Provider>
    );

    const checkbox = screen.getByLabelText('add to favorites');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith(addCard(mockPlanet1));
  });

  it('should remove a card when checkbox is unchecked', () => {
    const initialState = {
      cards: {
        selectedCards: [mockPlanet1],
      },
      currentCard: initialCurrentCardState,
    };

    const store = configureStore({
      reducer: {
        currentCard: currentCardSlice,
        cards: cardsSlice,
      },
      preloadedState: initialState,
    });

    const dispatchMock = vi.fn();
    store.dispatch = dispatchMock;

    render(
      <Provider store={store}>
        <Card {...mockPlanet1} />
      </Provider>
    );

    const checkbox = screen.getByLabelText('remove from favorites');
    fireEvent.click(checkbox);

    expect(dispatchMock).toHaveBeenCalledWith(removeCard(mockPlanet1.name));
  });
});
