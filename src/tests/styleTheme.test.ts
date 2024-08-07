import { describe, it, expect } from 'vitest';
import styleTheme from '../utils/styleTheme';

describe('styleTheme', () => {
  it('should return correct styles when theme is true', () => {
    const result = styleTheme(true);
    expect(result).toEqual({
      backgroundColor: '#2b3f5b',
      color: '#f6f5f2',
    });
  });

  it('should return correct styles when theme is false', () => {
    const result = styleTheme(false);
    expect(result).toEqual({
      backgroundColor: '#f6f5f2',
      color: '#2b3f5b',
    });
  });
});
