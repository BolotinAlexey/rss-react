import { describe, it, expect } from 'vitest';
import searchLastNumber from '../utils/searchLastNumber';

describe('searchLastNumber', () => {
  it('should return the last number from the URL', () => {
    const url = 'https://swapi.dev/api/planets/1/';
    expect(searchLastNumber(url)).toBe('1');
  });

  it('should return the last number even if there are other segments', () => {
    const url = 'https://example.com/section/42/subsection/108';
    expect(searchLastNumber(url)).toBe('108');
  });

  it('should return 0 if no number is present in the URL', () => {
    const url = 'https://example.com/section/subsection';
    expect(searchLastNumber(url)).toBe('0');
  });

  it('should handle URLs with mixed content', () => {
    const url = 'https://example.com/abc/def/123/ghi';
    expect(searchLastNumber(url)).toBe('123');
  });

  it('should handle URLs with multiple numbers and return the last one', () => {
    const url = 'https://example.com/1/2/3/4/5';
    expect(searchLastNumber(url)).toBe('5');
  });

  it('should handle empty URL', () => {
    const url = '';
    expect(searchLastNumber(url)).toBe('0');
  });

  it('should handle URL with no slashes', () => {
    const url = '12345';
    expect(searchLastNumber(url)).toBe('12345');
  });

  it('should handle URL with trailing slashes', () => {
    const url = 'https://example.com/section/123/';
    expect(searchLastNumber(url)).toBe('123');
  });

  it('should handle URL with special characters', () => {
    const url = 'https://example.com/section/123?query=456#hash=789';
    expect(searchLastNumber(url)).toBe('789');
  });

  it('should handle URL with port numbers', () => {
    const url = 'https://example.com:8080/section/123/';
    expect(searchLastNumber(url)).toBe('123');
  });

  it('should handle URL with query parameters containing numbers', () => {
    const url = 'https://example.com/section/123?param=456';
    expect(searchLastNumber(url)).toBe('456');
  });

  it('should handle URL with fragment identifiers containing numbers', () => {
    const url = 'https://example.com/section/123#456';
    expect(searchLastNumber(url)).toBe('456');
  });

  it('should handle URL with IP address', () => {
    const url = 'http://192.168.1.1/section/123/';
    expect(searchLastNumber(url)).toBe('123');
  });
});
