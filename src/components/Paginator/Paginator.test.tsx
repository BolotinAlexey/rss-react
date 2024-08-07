import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Paginator from './Paginator';

vi.mock('./LinkPage', () => ({
  __esModule: true,
  default: (props: { page: number }) => <button>{props.page}</button>,
}));

describe('Paginator', () => {
  it('should not render anything when countPages is zero', () => {
    render(<Paginator countPages={0} />);
    expect(screen.queryByRole('list')).toBeNull();
  });

  it('should render the correct number of LinkPage components', () => {
    render(<Paginator countPages={25} />);

    const linkPages = screen.getAllByRole('button');
    expect(linkPages).toHaveLength(3);

    expect(linkPages[0]).toHaveTextContent('1');
    expect(linkPages[1]).toHaveTextContent('2');
    expect(linkPages[2]).toHaveTextContent('3');
  });

  it('should render no LinkPage components if countPages is not provided', () => {
    render(<Paginator countPages={0} />);

    expect(screen.queryByRole('list')).toBeNull();
  });
});
