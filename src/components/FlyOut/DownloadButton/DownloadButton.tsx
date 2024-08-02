import { useSelector } from 'react-redux';
import { RootState } from '../../../store/store';
import convertToCsv from '../../../utils/convertToCsv';
import { useEffect, useMemo, useState } from 'react';
import {
  createCsvBlob,
  createCsvUrl,
  revokeCsvUrl,
} from '../../../utils/downloadCsv';

export default function DownloadButton() {
  const cards = useSelector((state: RootState) => state.cards.selectedCards);

  const csvContent = useMemo(() => convertToCsv(cards), [cards]);
  const blob = useMemo(() => createCsvBlob(csvContent), [csvContent]);
  const [url, setUrl] = useState<string | null>(null);

  useEffect(() => {
    const newUrl = createCsvUrl(blob);
    setUrl(newUrl);

    return () => {
      if (url) {
        revokeCsvUrl(url);
      }
    };
  }, [blob]);

  if (!url) {
    return null;
  }

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
