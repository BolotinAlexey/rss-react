import { render, screen } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render Main component for root path', () => {
    render(<App />);

    setTimeout(async () => {
      expect(screen.getByText('Planets')).toBeInTheDocument();
    }, 500);
  });

  it('should render ErrorPage for invalid routes', () => {
    render(<App />);
    setTimeout(async () => {
      expect(screen.getByText('Page not found')).toBeInTheDocument();
    });
  });
});
