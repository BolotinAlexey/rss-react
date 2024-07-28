import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import UnselectButton from './UnselectButton'; // Update with the correct path
import { clearCards } from '../../../store/slices/cardsSlice';
import store from '../../../store/store';

const mockDispatch = vi.fn();

vi.mock('react-redux', () => {
  const actual = vi.importActual('react-redux');
  return {
    ...actual,
    useDispatch: () => mockDispatch,
    Provider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

describe('UnselectButton Component', () => {
  it('should dispatch clearCards action when button is clicked', () => {
    render(
      <Provider store={store}>
        <UnselectButton />
      </Provider>
    );

    fireEvent.click(screen.getByText('Unselect all'));

    expect(mockDispatch).toHaveBeenCalledWith(clearCards());
  });
});
