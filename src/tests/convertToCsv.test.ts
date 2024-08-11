import { describe, it, expect } from 'vitest';
import convertToCsv from '../utils/convertToCsv';
import { IPlanet } from '../interfaces';

describe('convertToCsv', () => {
  it('should handle empty array', () => {
    const input: IPlanet[] = [];
    const expectedOutput = '';
    expect(convertToCsv(input)).toBe(expectedOutput);
  });
});
