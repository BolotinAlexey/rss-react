import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Provider } from 'react-redux';
import DetailsCard from './DetailsCard';
import store from '../../store/store';
import { setCurrentCard } from '../../store/slices/currentCardSlice';
import { mockPlanet1, planetArrayDetails1 } from '../../tests/mockData';

// vi.mock('../../service/apiRtk', async (importOriginal) => {
//   const actual = (await importOriginal()) as typeof import('react-redux');
//   return {
//     ...actual,
//     useGetDetailsQuery: vi.fn(),
//   };
// });

vi.mock('../../utils/transformPropsArrayToString', () => ({
  default: vi.fn().mockResolvedValue('mocked string'),
}));

// vi.mock('../../utils/styleTheme', () => ({
//   default: vi.fn().mockReturnValue({ backgroundColor: 'white' }),
// }));

// vi.mock('../../hooks/useTheme', () => ({
//   useTheme: () => ['light'],
// }));

vi.mock('./CloseDetailsButton', () => ({
  default: () => <button>Close</button>,
}));

describe('DetailsCard Component', () => {
  // it('should display error message if there is an error', () => {
  //   render(
  //     <Provider store={store}>
  //       <DetailsCard
  //         planet={mockPlanet1}
  //         planetArrayDetails={planetArrayDetails1}
  //       />
  //     </Provider>
  //   );

  //   expect(screen.getByText('Error: Error message')).toBeInTheDocument();
  // });

  it('should dispatch setCurrentCard action when data is fetched', async () => {
    // (useGetDetailsQuery as Mock).mockReturnValue({
    //   data: mockPlanet,
    //   isFetching: false,
    //   error: null,
    // });

    const dispatch = vi.spyOn(store, 'dispatch');
    render(
      <Provider store={store}>
        <DetailsCard
          planet={mockPlanet1}
          planetArrayDetails={planetArrayDetails1}
        />
      </Provider>
    );

    await waitFor(() => {
      expect(dispatch).toHaveBeenCalledWith(setCurrentCard(mockPlanet1));
    });
  });
});
