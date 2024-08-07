import { describe, it, expect, vi } from 'vitest';
import { NextRouter } from 'next/router';
import setNewPathWithoutDetails from '../utils/setNewPathWithoutDetails';

describe('setNewPathWithoutDetails', () => {
  it('should return a path without the details query parameter', () => {
    const mockRouter: NextRouter = {
      pathname: '/current-page',
      query: {
        page: '1',
        search: 'test',
        details: '123',
      },
      asPath: '',
      basePath: '',
      isFallback: false,
      prefetch: vi.fn(),
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
    } as unknown as NextRouter;

    const result = setNewPathWithoutDetails(mockRouter);

    expect(result).toEqual({
      pathname: '/current-page',
      query: {
        page: '1',
        search: 'test',
      },
    });
  });

  it('should handle missing query parameters', () => {
    const mockRouter: NextRouter = {
      pathname: '/current-page',
      query: {},
      asPath: '',
      basePath: '',
      isFallback: false,
      prefetch: vi.fn(),
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
    } as unknown as NextRouter;

    const result = setNewPathWithoutDetails(mockRouter);

    expect(result).toEqual({
      pathname: '/current-page',
      query: {},
    });
  });

  it('should handle query parameters with undefined values', () => {
    const mockRouter: NextRouter = {
      pathname: '/current-page',
      query: {
        page: undefined,
        search: 'test',
        details: '123',
      },
      asPath: '',
      basePath: '',
      isFallback: false,
      prefetch: vi.fn(),
      push: vi.fn(),
      replace: vi.fn(),
      reload: vi.fn(),
      back: vi.fn(),
      beforePopState: vi.fn(),
      events: {
        on: vi.fn(),
        off: vi.fn(),
        emit: vi.fn(),
      },
    } as unknown as NextRouter;

    const result = setNewPathWithoutDetails(mockRouter);

    expect(result).toEqual({
      pathname: '/current-page',
      query: {
        search: 'test',
      },
    });
  });
});
