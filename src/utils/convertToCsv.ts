import { IPlanet } from '../interfaces';

export default function convertToCsv(arr: IPlanet[]): string {
  const csvContent = arr
    .map((planet) =>
      Object.entries(planet)
        .map(([key, value]) => `${key} : ${value}`)
        .join('\n')
    )
    .join('\n\n\n');

  return csvContent;
}
