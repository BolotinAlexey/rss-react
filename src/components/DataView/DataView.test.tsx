import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import DataView from './DataView';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import cardsSlice, { CardsState } from '../../store/slices/cardsSlice';
import currentCardSlice, {
  CurrentCardState,
} from '../../store/slices/currentCardSlice';
import {
  mockPlanet1,
  mockPlanet2,
  mockRouter,
  mockSearchParams,
} from '../../tests/mockData';
import { IPlanet } from '../../interfaces';

const planets: IPlanet[] = [mockPlanet1, mockPlanet2];

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  useSearchParams: () => mockSearchParams,
}));

const initialCardsState: CardsState = {
  selectedCards: [],
};
const initialCurrentCardState: CurrentCardState = {
  currentCard: null,
};

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
      <DataView planets={planets} />
    </Provider>
  );
};

describe('DataView', () => {
  it('renders planets with relevant data', async () => {
    renderWithStore({
      cards: initialCardsState,
      currentCard: initialCurrentCardState,
    });

    await waitFor(() => {
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
      expect(screen.getByText('Alderaan')).toBeInTheDocument();
    });

    const user = userEvent.setup();
    const tatooine = screen.getByText('Tatooine');

    user.click(tatooine);

    await waitFor(() => {
      expect(mockRouter.push).toHaveBeenCalledWith(
        '/?page=null&search=null&details=1'
      );
    });
  });

  it('renders the correct number of planets', async () => {
    renderWithStore({
      cards: initialCardsState,
      currentCard: initialCurrentCardState,
    });

    await waitFor(() => {
      const planetList = screen.getAllByRole('listitem');
      expect(planetList).toHaveLength(planets.length);
    });
  });

  it("displays 'Not found' when there are no planets", () => {
    const renderWithStoreEmpty = (initialState: {
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
          <DataView planets={[]} />
        </Provider>
      );
    };

    renderWithStoreEmpty({
      cards: initialCardsState,
      currentCard: initialCurrentCardState,
    });

    expect(screen.getByText('Not found')).toBeInTheDocument();
  });
});
