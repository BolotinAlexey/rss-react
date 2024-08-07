import { describe, it, expect, vi, beforeEach } from 'vitest';

const Loader = () => <div>Loading</div>;

vi.mock('next/dynamic', () => ({
  __esModule: true,
  default: vi.fn(() => Loader),
}));

describe('IndexPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render Loader while Main is loading', async () => {
    vi.mock('next/dynamic', () => ({
      __esModule: true,
      default: vi.fn(() => Loader),
    }));

    const { render, screen, waitFor } = await import('@testing-library/react');
    const { default: IndexPage } = await import('./IndexPage');
    const { mockPlanet1 } = await import('../../tests/mockData');

    const mockResponse = {
      results: [],
      count: 0,
      next: null,
      previous: null,
    };

    const mockPlanetArrayDetails = {
      filmTitles: 'Film 1',
      residentNames: 'Resident 1',
    };

    render(
      <IndexPage
        response={mockResponse}
        planet={mockPlanet1}
        planetArrayDetails={mockPlanetArrayDetails}
      />
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();

    setTimeout(async () => {
      await waitFor(() => {
        expect(screen.queryByText(/Loading/i)).not.toBeInTheDocument();
      });
    }, 1000);
  });
});
