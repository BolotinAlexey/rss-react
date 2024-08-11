import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { Provider } from 'react-redux';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';
import store from '../../store';
import CloseDetailsButton from '../DetailsCard/CloseDetailsButton';

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock('@remix-run/react', async () => {
  const actual = await vi.importActual('@remix-run/react');
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
        <CloseDetailsButton />
      </Provider>
    );

    expect(screen.getByText('Hide details')).toBeInTheDocument();
  });

  it('should call navigate with the correct path when button is clicked', () => {
    render(
      <Provider store={store}>
        <CloseDetailsButton />
      </Provider>
    );

    fireEvent.click(screen.getByText('Hide details'));

    expect(mockNavigate).toHaveBeenCalledWith('/?example=search');
  });

  it('should dispatch resetCurrentCard action when button is clicked', () => {
    vi.spyOn(store, 'dispatch').mockImplementation(mockDispatch);

    render(
      <Provider store={store}>
        <CloseDetailsButton />
      </Provider>
    );

    fireEvent.click(screen.getByText('Hide details'));

    expect(mockDispatch).toHaveBeenCalledWith(resetCurrentCard());
  });
});
