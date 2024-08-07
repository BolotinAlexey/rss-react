import { render, screen } from '@testing-library/react';
import UseLoadingComponent from '../tests/UseLoadingComponent';
import { vi } from 'vitest';

describe('useLoading Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize with loading state as false', () => {
    render(<UseLoadingComponent />);
    expect(screen.getByTestId('loading-status')).toHaveTextContent(
      'Not Loading'
    );
  });
});
