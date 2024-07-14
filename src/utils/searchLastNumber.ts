export default function searchLastNumber(url: string): string {
  if (!url) return '0';
  const matches = url.match(/(\d+)/g);
  return matches ? matches[matches.length - 1] : '0';
}
