import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import FlyOut from './FlyOut';
import store, { RootState } from '../../store/store';
import { IPlanet } from '../../interfaces';

vi.mock('../../utils/downloadCsv', () => ({
  createCsvBlob: vi.fn(),
  createCsvUrl: vi.fn().mockReturnValue('mockUrl'),
  revokeCsvUrl: vi.fn(),
}));

vi.mock('react-redux', async (importOriginal) => {
  const actual = (await importOriginal()) as typeof import('react-redux');
  return {
    ...actual,
    useSelector: (
      selector: (state: RootState) => { cards: { selectedCards: IPlanet[] } }
    ) =>
      selector({
        cards: { selectedCards: [{}] },
      } as RootState),
    useDispatch: () => vi.fn(),
  };
});

vi.mock('../../hooks/useTheme', () => ({
  useTheme: () => ['light'],
}));

vi.mock('../../utils/styleTheme', () => ({
  default: () => ({ backgroundColor: 'white' }),
}));

describe('FlyOut Component', () => {
  it('should display the correct number of selected items', () => {
    render(
      <Provider store={store}>
        <FlyOut />
      </Provider>
    );

    expect(screen.getByText('1 items are selected')).toBeInTheDocument();
  });

  it('should apply the correct theme styles', () => {
    render(
      <Provider store={store}>
        <FlyOut />
      </Provider>
    );

    const flyOutElement = screen.getByText(
      '1 items are selected'
    ).parentElement;
    expect(flyOutElement).toHaveClass('fly show');
  });

  it('should render UnselectButton and DownloadButton', () => {
    render(
      <Provider store={store}>
        <FlyOut />
      </Provider>
    );

    expect(screen.getByText('Unselect all')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
  });
});
