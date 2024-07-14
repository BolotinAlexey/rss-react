// import '@testing-library/jest-dom';
// import { describe, expect, it } from 'vitest';
// import { render, screen, fireEvent, waitFor } from '@testing-library/react';
// import DataView from './DataView';
// import { createMemoryHistory } from 'history';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => jest.fn(),
//   useNavigation: () => ({
//     location: {
//       search: '?page=1&search=Planet',
//       pathname: '/planets',
//     },
//   }),
//   useLoaderData: () => ({
//     results: [
//       { name: 'Planet 1', population: '1000' },
//       { name: 'Planet 2', population: '5000' },
//     ],
//   }),
// }));

// // Test Suite using vitest
// describe('DataView Component Tests', () => {
//   it('renders loader when data is loading', async () => {
//     const history = createMemoryHistory();
//     // const router = createBrowserRouter([
//     //   {
//     //     path: '/',
//     //     element: <DataView />
//     //   },
//     // ]);
//     // render(
//     //   <RouterProvider router={router} history={history}>
//     //   </RouterProvider>
//     // );

//     renderWithRouter(<DataView />, [
//       {
//         path: "/contacts",
//         element: <h2>Contacts page</h2>,
//       },
//     ]);

//     expect(screen.getByTestId('loader')).toBeInTheDocument();
//     await waitFor(() => {
//       expect(screen.queryByTestId('loader')).toBeNull();
//     });
//   });

//   it('renders list of planets when data is loaded', async () => {
//     const history = createMemoryHistory();

//     render(
//       <RouterProvider history={history}>
//         <DataView name={null} />
//       </RouterProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getAllByTestId('planet-card').length).toBe(2);
//     });
//   });

//   it('renders "Not founds" message when no planets are found', async () => {
//     jest.spyOn(global, 'fetch').mockResolvedValueOnce({
//       json: () => Promise.resolve({ results: [] }),
//     } as Response);
//     const history = createMemoryHistory();

//     render(
//       <RouterProvider history={history}>
//         <DataView name={null} />
//       </RouterProvider>
//     );

//     await waitFor(() => {
//       expect(screen.getByText('Not founds')).toBeInTheDocument();
//     });
//   });

//   it('navigates with search parameter when name prop changes', async () => {
//     const history = createMemoryHistory();

//     render(
//       <RouterProvider history={history}>
//         <DataView name={null} />
//       </RouterProvider>
//     );

//     const newName = 'NewPlanet';
//     fireEvent.change(screen.getByRole('textbox'), { target: { value: newName } });
//     fireEvent.click(screen.getByRole('button', { name: /search/i }));

//     await waitFor(() => {
//       expect(history.location.search).toBe(`?page=1&search=${newName}`);
//     });
//   });
// });
