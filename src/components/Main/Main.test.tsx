import { vi } from 'vitest';
import Main from './Main';
import { render, screen } from '@testing-library/react';
import store from '../../store';
import { Provider } from 'react-redux';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useLocation: () => ({ pathname: '/' }),
    useNavigate: () => vi.fn(),
    Outlet: () => <div data-testid="mock-outlet"></div>,
  };
});

vi.mock('../FormSearch', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-form-search"></div>,
}));

vi.mock('../DataView', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-data-view"></div>,
}));

vi.mock('../Paginator', () => ({
  __esModule: true,
  default: () => <div data-testid="mock-paginator"></div>,
}));

it('renders the header "Planets"', () => {
  render(
    <Provider store={store}>
      <Main />
    </Provider>
  );

  const headerElement = screen.getByRole('heading', { name: /Planets/i });
  expect(headerElement).toBeInTheDocument();
});
