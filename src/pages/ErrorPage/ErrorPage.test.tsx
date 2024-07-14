import { vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import ErrorPage from './ErrorPage';
import * as ReactRouterDom from 'react-router-dom';

vi.mock('react-router-dom', () => {
  const actual = vi.importActual('react-router-dom');
  return {
    ...actual,
    useRouteError: vi.fn(),
  };
});

describe('ErrorPage', () => {
  it('renders error message correctly', () => {
    const mockError = {
      statusText: 'Not Found',
      message: 'This is a test error message',
    };
    (ReactRouterDom.useRouteError as jest.Mock).mockReturnValue(mockError);

    render(<ErrorPage />);

    expect(screen.getByRole('heading', { name: /Oops!/i })).toBeInTheDocument();
    expect(
      screen.getByText(/Sorry, an unexpected error has occurred./i)
    ).toBeInTheDocument();
    expect(screen.getByText(/Not Found/i)).toBeInTheDocument();
  });

  it('renders default error message if statusText is not provided', () => {
    const mockError = { message: 'This is a test error message' };
    (ReactRouterDom.useRouteError as jest.Mock).mockReturnValue(mockError);

    render(<ErrorPage />);

    expect(
      screen.getByText(/This is a test error message/i)
    ).toBeInTheDocument();
  });
});
