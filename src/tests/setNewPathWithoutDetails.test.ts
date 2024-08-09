import { describe, it, expect } from 'vitest';
import { ReadonlyURLSearchParams } from 'next/navigation';
import setNewPathWithoutDetails from '../utils/setNewPathWithoutDetails';

describe('setNewPathWithoutDetails', () => {
  const createMockSearchParams = (
    params: Record<string, string | undefined>
  ) => {
    return {
      get: (key: string) => params[key] || null,
    } as ReadonlyURLSearchParams;
  };

  it('should return a path without the details query parameter', () => {
    const mockQuery = createMockSearchParams({
      page: '1',
      search: 'test',
      details: '123',
    });

    const result = setNewPathWithoutDetails(mockQuery);

    expect(result).toBe('/?page=1&search=test');
  });

  it('should handle missing query parameters', () => {
    const mockQuery = createMockSearchParams({});

    const result = setNewPathWithoutDetails(mockQuery);

    expect(result).toBe('/?page=null&search=null');
  });

  it('should handle query parameters with undefined values', () => {
    const mockQuery = createMockSearchParams({
      page: undefined,
      search: 'test',
      details: '123',
    });

    const result = setNewPathWithoutDetails(mockQuery);

    expect(result).toBe('/?page=null&search=test');
  });
});
