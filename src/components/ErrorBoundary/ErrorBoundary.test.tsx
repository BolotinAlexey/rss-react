import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import { vi } from 'vitest';

// Mock ErrorFallBack
vi.mock('./ErrorFallBack', () => ({
  __esModule: true,
  default: ({
    errorMessage,
    onResetError,
  }: {
    errorMessage: string;
    onResetError: () => void;
  }) => (
    <div data-testid="error-fallback">
      <p>{errorMessage}</p>
      <button onClick={onResetError}>reset error</button>
    </div>
  ),
}));

const ProblemChild = () => {
  throw new Error('Test error');
};

describe('ErrorBoundary', () => {
  it('renders child component when no error is thrown', () => {
    render(
      <ErrorBoundary>
        <div data-testid="child">Child Component</div>
      </ErrorBoundary>
    );

    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  it('catches an error and displays ErrorFallBack', () => {
    render(
      <ErrorBoundary>
        <ProblemChild />
      </ErrorBoundary>
    );

    expect(screen.getByTestId('error-fallback')).toBeInTheDocument();
    expect(screen.getByText(/Test error/)).toBeInTheDocument();
  });
});
