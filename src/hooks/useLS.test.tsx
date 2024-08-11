import { render } from '@testing-library/react';
import useLS from './useLS';
import { vi } from 'vitest';

vi.mock('@remix-run/react', () => ({
  useLocation: vi.fn(() => ({
    search: '?page=1&search=test',
  })),
}));

describe('useLS custom hook', () => {
  it('should initialize with value from query parameter', () => {
    const mockOnSubmitName = vi.fn();

    const TestComponent = () => {
      const [name] = useLS(mockOnSubmitName);
      return <div>{name}</div>;
    };

    const { getByText } = render(<TestComponent />);

    expect(getByText('test')).toBeInTheDocument();
    expect(mockOnSubmitName).toHaveBeenCalledWith('test');
  });
});
