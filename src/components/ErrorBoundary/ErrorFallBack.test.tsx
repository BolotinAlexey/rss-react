import { render, screen, fireEvent } from '@testing-library/react';
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

    // Check if the error message is displayed
    expect(screen.getByText(errorMessage)).toBeInTheDocument();
    // Check if the button is displayed
    expect(screen.getByText('reset error')).toBeInTheDocument();
  });

  it('calls onResetError when the button is clicked', () => {
    const errorMessage = 'Test error message';

    render(
      <ErrorFallBack
        errorMessage={errorMessage}
        onResetError={mockOnResetError}
      />
    );

    // Click the button
    fireEvent.click(screen.getByText('reset error'));

    // Check if onResetError was called
    expect(mockOnResetError).toHaveBeenCalledTimes(1);
  });
});
