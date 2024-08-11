import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Mock, vi } from 'vitest';
import Paginator from '../Paginator';
import { Provider } from 'react-redux';
import store from '../../store';
import * as RemixReact from '@remix-run/react';

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

const mockResponse = {
  count: 45,
  results: [],
};

describe('Paginator component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the correct number of pages based on the loader data', async () => {
    (RemixReact.useLoaderData as Mock).mockReturnValue({
      res: mockResponse,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Paginator />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const linkElements = screen.getAllByRole('link');
      expect(linkElements).toHaveLength(Math.ceil(mockResponse.count / 10));
    });
  });

  it('renders page links with correct numbers', async () => {
    mockResponse.count = 30;
    (RemixReact.useLoaderData as Mock).mockReturnValue({
      res: mockResponse,
    });

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/']}>
          <Routes>
            <Route path="/" element={<Paginator />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    await waitFor(() => {
      const linkElements = screen.getAllByRole('link');
      linkElements.forEach((link, index) => {
        expect(link).toHaveTextContent((index + 1).toString());
      });
    });
  });
});
