import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Layout from './Layout';

describe('Layout', () => {
  it('should render ThemeProvider, Header, and children', () => {
    const testContent = <div>Test Content</div>;

    render(<Layout>{testContent}</Layout>);

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });
});
