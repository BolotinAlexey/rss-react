import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

describe('App Component', () => {
  it('should render Main component for root path', () => {
    render(<App />);

    setTimeout(async () => {
      await waitFor(() => {
        expect(screen.getByText('Planets')).toBeInTheDocument();
      });
    }, 500);
  });
});
