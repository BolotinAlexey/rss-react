export default function searchLastNumber(url: string): string {
  return url.split('/').reduce((a, b) => (isNaN(parseInt(b)) ? a : b), '0');
}
