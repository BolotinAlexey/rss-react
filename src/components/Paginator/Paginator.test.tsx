import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { vi } from 'vitest';
import Paginator from '../Paginator'; // Replace with your actual component path
import { IPlanetResponse } from '../../interfaces';
import { useLoaderData } from 'react-router-dom'; // Ensure correct import

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLoaderData: vi.fn(),
  };
});

const mockResponse: IPlanetResponse = {
  count: 45,
  results: [],
  next: null,
  previous: null,
};

describe('Paginator component', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('renders the correct number of pages based on the loader data', () => {
    vi.mocked(useLoaderData).mockReturnValue(mockResponse);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Paginator />} />
        </Routes>
      </MemoryRouter>
    );

    const linkElements = screen.getAllByRole('link');
    expect(linkElements).toHaveLength(Math.ceil(mockResponse.count / 10));
  });

  it('renders page links with correct numbers', () => {
    vi.mocked(useLoaderData).mockReturnValue(mockResponse);

    render(
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<Paginator />} />
        </Routes>
      </MemoryRouter>
    );

    mockResponse.count = 30;
    const linkElements = screen.getAllByRole('link');
    linkElements.forEach((link, index) => {
      expect(link).toHaveTextContent((index + 1).toString());
    });
  });
});
