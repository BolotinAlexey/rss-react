import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import convertToCsv from '../../../utils/convertToCsv';
import { useEffect, useMemo } from 'react';
import {
  createCsvBlob,
  createCsvUrl,
  revokeCsvUrl,
} from '../../../utils/downloatCsv';

export default function DownloadButton() {
  const cards = useSelector((state: RootState) => state.cards.selectedCards);

  const csvContent = useMemo(() => convertToCsv(cards), [cards]);
  const blob = useMemo(() => createCsvBlob(csvContent), [csvContent]);
  const url = useMemo(() => createCsvUrl(blob), [blob]);

  useEffect(() => {
    return () => {
      revokeCsvUrl(url);
    };
  }, [url]);

  return (
    <a
      className="flyout-download"
      href={url}
      download={`${cards.length}_planets.csv`}
    >
      Download
    </a>
  );
}
