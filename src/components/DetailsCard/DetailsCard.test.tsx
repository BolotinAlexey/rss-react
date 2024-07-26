import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { BrowserRouter, useParams } from 'react-router-dom';
import DetailsCard from './DetailsCard';
import { describe, it, Mock, vi } from 'vitest';
import { Provider } from 'react-redux';
import store from '../../store';

vi.mock('react-router-dom', async () => {
  const originalModule =
    await vi.importActual<typeof import('react-router-dom')>(
      'react-router-dom'
    );
  return {
    ...originalModule,
    useParams: vi.fn(),
  };
});

vi.mock('../../utils/transformPropsArrayToString', () => ({
  __esModule: true,
  default: vi.fn(() => Promise.resolve('Mocked String')),
}));

describe('DetailsCard component', () => {
  beforeEach(() => {
    (useParams as Mock).mockReset();
    vi.clearAllMocks();
  });

  it('should render the planet details correctly', async () => {
    (useParams as Mock).mockReturnValue({ namePlanet: '1' });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailsCard />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      expect(screen.getByText('Details')).toBeInTheDocument();
      expect(screen.getByText('Planet:')).toBeInTheDocument();
      expect(screen.getByText('Tatooine')).toBeInTheDocument();
    });
  });

  it('should render the correct link for the planet', async () => {
    (useParams as Mock).mockReturnValue({ namePlanet: '1' });

    render(
      <Provider store={store}>
        <BrowserRouter>
          <DetailsCard />
        </BrowserRouter>
      </Provider>
    );

    await waitFor(() => {
      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', 'https://swapi.dev/api/planets/1/');
    });
  });
});
