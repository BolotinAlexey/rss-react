import getDetailsNumber from '../utils/getDetailsNumber';

describe('getDetailsNumber function', () => {
  it('should extract the numeric ID from a valid URL', () => {
    const url = 'https://example.com/details/123';
    expect(getDetailsNumber(url)).toBe(123);
  });

  it('should return a default value (1) if no numeric ID is found', () => {
    const url = 'https://example.com/details/';
    expect(getDetailsNumber(url)).toBe(1);
  });

  it('should return a default value (1) if the URL format is invalid', () => {
    const url = 'https://example.com/some/invalid/url';
    expect(getDetailsNumber(url)).toBe(1);
  });

  it('should handle empty string input', () => {
    const url = '';
    expect(getDetailsNumber(url)).toBe(1);
  });
});
