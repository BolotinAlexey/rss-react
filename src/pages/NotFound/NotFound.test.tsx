import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import NotFound from './NotFound';

describe('NotFound Component', () => {
  it('should render the NotFound component with text and button', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Not Found Page')).toBeInTheDocument();
    expect(screen.getByText('go Home')).toBeInTheDocument();
  });

  it('should navigate to home when the button is clicked', () => {
    render(
      <MemoryRouter initialEntries={['/non-existent']}>
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<div>Main Page</div>} />
        </Routes>
      </MemoryRouter>
    );

    const button = screen.getByText('go Home');
    fireEvent.click(button);

    expect(screen.getByText('Main Page')).toBeInTheDocument();
  });
});
