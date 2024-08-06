// import { render, screen } from '@testing-library/react';
// import { vi } from 'vitest';
// import FormSearch from '../FormSearch';
// import { RouterProvider, createMemoryRouter } from 'react-router-dom';

// vi.mock('../../hooks/useLS', () => ({
//   __esModule: true,
//   default: () => ['', vi.fn(), vi.fn()],
// }));

// const renderWithRouter = (ui: React.ReactElement) => {
//   const routes = [{ path: '/', element: ui }];
//   const router = createMemoryRouter(routes, { initialEntries: ['/'] });
//   return render(<RouterProvider router={router} />);
// };

// const onSubmitName = vi.fn();

// it('renders input with placeholder "Enter name"', async () => {
//   renderWithRouter(<FormSearch onSubmitName={onSubmitName} />);

//   const inputElement = screen.getByPlaceholderText('Enter name');
//   expect(inputElement).toBeInTheDocument();
// });

// it('renders button with text "Search"', async () => {
//   renderWithRouter(<FormSearch onSubmitName={onSubmitName} />);

//   const buttonElement = screen.getByText('Search');
//   expect(buttonElement).toBeInTheDocument();
// });
