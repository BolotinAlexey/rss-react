import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import DataView from './DataView';
import { Provider } from 'react-redux';
import store from '../../store';
import { mockPlanet1, mockPlanet2 } from '../../tests/mockData';

const planets = [mockPlanet1, mockPlanet2];
describe('DataView', () => {
  it("displays 'Loading..' when loading", async () => {
    render(
      <Provider store={store}>
        <DataView planets={planets} />
      </Provider>
    );
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });

  it('renders a Tatooine and Alderaan planets with relevant data', async () => {
    render(
      <Provider store={store}>
        <DataView planets={planets} />
      </Provider>
    );
    setTimeout(async () => {
      await waitFor(() => {
        expect(screen.getByText('Tatooine')).toBeInTheDocument();
        expect(screen.getByText('Alderaan')).toBeInTheDocument();
      });
      const user = userEvent.setup();
      const tatooine = screen.getByText('Tatooine');

      user.click(tatooine);

      await waitFor(() => expect(window.location.pathname).toBe(`/details/1/`));
    }, 1000);
  });

  it('renders the specified number of planets', async () => {
    render(
      <Provider store={store}>
        <DataView planets={planets} />
      </Provider>
    );

    setTimeout(async () => {
      await waitFor(() => {
        const characterList = screen.getAllByRole('listitem');
        expect(characterList).toHaveLength(10);
      });
    }, 1000);
  });

  it("displays 'Not found' when there are no results", async () => {
    render(
      <Provider store={store}>
        <DataView planets={planets} />
      </Provider>
    );
    await waitFor(() =>
      expect(screen.getByText('Not found')).toBeInTheDocument()
    );
  });
});
