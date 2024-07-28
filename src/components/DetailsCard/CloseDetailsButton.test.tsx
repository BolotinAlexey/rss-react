import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import CloseDetailsButton from './CloseDetailsButton';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import store from '../../store';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
    useLocation: () => ({ search: '?example=search' }),
  };
});

describe('CloseDetailsButton component', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render the button with correct text', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CloseDetailsButton />
        </BrowserRouter>
      </Provider>
    );

    expect(screen.getByText('Hide details')).toBeInTheDocument();
  });

  it('should call navigate with the correct path when button is clicked', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <CloseDetailsButton />
        </BrowserRouter>
      </Provider>
    );

    fireEvent.click(screen.getByText('Hide details'));

    expect(mockNavigate).toHaveBeenCalledWith('/?example=search', {
      replace: true,
    });
  });

  it('should dispatch resetCurrentCard action when button is clicked', () => {
    vi.spyOn(store, 'dispatch').mockImplementation(mockDispatch);

    const { getByText } = render(
      <Provider store={store}>
        <CloseDetailsButton />
      </Provider>
    );

    fireEvent.click(getByText('Hide details'));

    expect(mockDispatch).toHaveBeenCalledWith(resetCurrentCard());
  });
});
