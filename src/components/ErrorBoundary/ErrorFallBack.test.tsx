import { render, screen } from '@testing-library/react';
import ErrorFallBack from './ErrorFallBack';
import { vi } from 'vitest';

describe('ErrorFallBack', () => {
  const mockOnResetError = vi.fn();

  it('renders the error message and button', () => {
    const errorMessage = 'Test error message';

    render(
      <ErrorFallBack
        errorMessage={errorMessage}
        onResetError={mockOnResetError}
      />
    );

    expect(screen.getByText(errorMessage)).toBeInTheDocument();
  });
});
