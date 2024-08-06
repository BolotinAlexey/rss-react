// import { render, screen } from '@testing-library/react';
// import { MemoryRouter, Route, Routes } from 'react-router-dom';
// import LinkPage from './LinkPage';
// import { LS_KEY } from '../../constants';

// const renderWithRouter = (ui: React.ReactElement, { route = '/' } = {}) => {
//   window.history.pushState({}, 'Test page', route);

//   return render(
//     <MemoryRouter initialEntries={[route]}>
//       <Routes>
//         <Route path="/" element={ui} />
//       </Routes>
//     </MemoryRouter>
//   );
// };

// describe('LinkPage component', () => {
//   beforeEach(() => {
//     localStorage.setItem(LS_KEY, 'test');
//   });

//   afterEach(() => {
//     localStorage.clear();
//   });

//   it('renders NavLink with the correct page number', () => {
//     renderWithRouter(<LinkPage page={1} />);

//     const linkElement = screen.getByText('1');
//     expect(linkElement).toBeInTheDocument();
//     expect(linkElement).toHaveClass('paginator__link');
//   });

//   it('sets the correct URL in the NavLink', () => {
//     renderWithRouter(<LinkPage page={2} />, { route: '/?page=1&search=test' });

//     const linkElement = screen.getByText('2');
//     expect(linkElement).toBeInTheDocument();
//     expect(linkElement).toHaveAttribute('href', '/?page=2&search=test');
//   });

//   it('applies the active-page class when the link is active', () => {
//     renderWithRouter(<LinkPage page={2} />, { route: '/?page=2&search=test' });

//     const linkElement = screen.getByText('2');
//     expect(linkElement).toBeInTheDocument();
//     expect(linkElement).toHaveClass('active-page');
//   });
// });
