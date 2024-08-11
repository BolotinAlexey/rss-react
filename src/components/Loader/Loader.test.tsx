import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader component', () => {
  it('renders correctly', () => {
    render(<Loader />);

    expect(screen.getByText(/Loading\.\./i)).toBeInTheDocument();
  });

  it('has correct class name', () => {
    render(<Loader />);

    expect(screen.getByText(/Loading\.\./i).parentElement).toHaveClass(
      'loader'
    );
  });
});
