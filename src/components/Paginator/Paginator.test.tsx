import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import Paginator from '../Paginator';
import { Provider } from 'react-redux';
import store from '../../store';

vi.mock('../../service/apiRtk', async (importOriginal) => {
  const actual = (await importOriginal()) as object;
  return {
    ...actual,
    useGetPlanetsQuery: vi.fn(),
  };
});

const mockResponse = {
  count: 45,
  results: [],
  next: null,
  previous: null,
};

const mockQueryReturnValue = {
  data: mockResponse,
  error: null,
  isLoading: false,
  isFetching: false,
  refetch: vi.fn(),
};

describe('Paginator component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the correct number of pages based on the loader data', async () => {
    vi.mocked(useGetPlanetsQuery).mockReturnValue(mockQueryReturnValue);

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
    vi.mocked(useGetPlanetsQuery).mockReturnValue(mockQueryReturnValue);

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
