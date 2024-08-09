import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import '@testing-library/jest-dom';
import Loading from '../app/loading';

describe('Loading Component', () => {
  it('renders the Loader component', () => {
    render(<Loading />);
    expect(screen.getByText('Loading..')).toBeInTheDocument();
  });
});
