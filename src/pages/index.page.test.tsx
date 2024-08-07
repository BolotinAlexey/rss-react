import { describe, it, expect } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import * as IndexPageModule from './index'; // Import everything from the index file
import { vi } from 'vitest';
import { mockPlanet1 } from '../tests/mockData';

vi.mock('../components/ErrorBoundary', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../components/ThemeProvider', () => ({
  __esModule: true,
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock('../components/Header', () => ({
  __esModule: true,
  default: () => <div>Header</div>,
}));

describe('index.tsx page component', () => {
  it('should render the page with the necessary providers and components', () => {
    const mockResponse = { results: [], count: 0, next: null, previous: null };
    const mockPlanetArrayDetails = {
      filmTitles: 'Film1',
      residentNames: 'Resident1',
    };

    render(
      <IndexPageModule.default
        resp={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails}
      />
    );

    expect(screen.getByText('Loading..')).toBeInTheDocument();

    setTimeout(async () => {
      await waitFor(() => {
        expect(screen.queryByText('Loading..')).not.toBeInTheDocument();
      });
    }, 1000);
  });
});
