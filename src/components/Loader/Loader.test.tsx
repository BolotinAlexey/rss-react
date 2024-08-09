import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Loader from './Loader';

describe('Loader Component', () => {
  it('should render correctly', () => {
    render(<Loader />);

    const loaderElement = screen.getByText('Loading..');
    expect(loaderElement).toBeInTheDocument();

    expect(loaderElement.closest('div')).toHaveClass('loader');
  });
});
