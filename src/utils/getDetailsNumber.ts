export default function getDetailsNumber(url: string): number {
  const regex = /details\/(\d+)/;
  const match = url.match(regex);
  return match ? parseInt(match[1]) : 1;
}
