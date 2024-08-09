import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import RootLayout from '../app/layout';
import '@testing-library/jest-dom';

describe('RootLayout', () => {
  it('renders the Header component and main content correctly', () => {
    render(
      <RootLayout>
        <div>Child Component</div>
      </RootLayout>
    );

    expect(screen.getByRole('banner')).toBeInTheDocument();

    expect(screen.getByText('Planets')).toBeInTheDocument();

    expect(screen.getByText('Child Component')).toBeInTheDocument();
  });

  it('renders children correctly within the layout', () => {
    render(
      <RootLayout>
        <div>Another Child Component</div>
      </RootLayout>
    );

    expect(screen.getByText('Another Child Component')).toBeInTheDocument();
  });
});
