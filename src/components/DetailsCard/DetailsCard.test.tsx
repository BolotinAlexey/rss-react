import { render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, Mock } from 'vitest';
import { Provider } from 'react-redux';
import DetailsCard from './DetailsCard';
import { setCurrentCard } from '../../store/slices/currentCardSlice';
import store from '../../store/store';
import { useLoaderData, useNavigation } from '@remix-run/react';
import { mockPlanet1 } from '../../tests/mockData';

vi.mock('@remix-run/react', () => ({
  useLoaderData: vi.fn(),
  useNavigation: vi.fn(),
}));

vi.mock('../../utils/transformPropsArrayToString', () => ({
  default: vi.fn().mockResolvedValue('mocked string'),
}));

vi.mock('./CloseDetailsButton', () => ({
  default: () => <button>Close</button>,
}));

describe('DetailsCard Component', () => {
  it('should render null if planet data is not available', () => {
    (useLoaderData as Mock).mockReturnValue({ planet: null });

    render(
      <Provider store={store}>
        <DetailsCard />
      </Provider>
    );

    expect(screen.queryByText('Details')).not.toBeInTheDocument();
  });

  it('should dispatch setCurrentCard action when data is loaded', async () => {
    (useLoaderData as Mock).mockReturnValue({ planet: mockPlanet1 });
    (useNavigation as Mock).mockReturnValue({ state: 'idle' });

    const dispatch = vi.spyOn(store, 'dispatch');

    render(
      <Provider store={store}>
        <DetailsCard />
      </Provider>
    );

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setCurrentCard(mockPlanet1));
    });
  });

  it('should display planet details when data is available', async () => {
    (useLoaderData as Mock).mockReturnValue({ planet: mockPlanet1 });
    (useNavigation as Mock).mockReturnValue({ state: 'idle' });

    render(
      <Provider store={store}>
        <DetailsCard />
      </Provider>
    );
    setTimeout(async () => {
      await waitFor(() => {
        expect(screen.getByText('Planet:')).toBeInTheDocument();
        expect(screen.getByText(/Tatooine/)).toBeInTheDocument();
        expect(screen.getByText(/climate:/)).toBeInTheDocument();
        expect(screen.getByText(/arid/)).toBeInTheDocument();
      });
    }, 1000);
  });
});
