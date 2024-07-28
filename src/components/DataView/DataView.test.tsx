import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { BrowserRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import DataView from './DataView';
import { Provider } from 'react-redux';
import store from '../../store';

describe('DataView', () => {
  it("displays 'Loading..' when loading", async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataView name={''} />
        </BrowserRouter>
      </Provider>
    );
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });
  it('renders a Tatooine and Alderaan planets with relevant data', async () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <DataView name={''} />
        </BrowserRouter>
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
        <BrowserRouter>
          <DataView name={''} />
        </BrowserRouter>
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
        <BrowserRouter>
          <DataView name={'no exist'} />
        </BrowserRouter>
      </Provider>
    );
    await waitFor(() =>
      expect(screen.getByText('Not found')).toBeInTheDocument()
    );
  });
});
