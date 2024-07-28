export function createCsvBlob(csvContent: string): Blob {
  return new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
}

export function createCsvUrl(blob: Blob): string {
  return URL.createObjectURL(blob);
}

export function revokeCsvUrl(url: string): void {
  URL.revokeObjectURL(url);
}
