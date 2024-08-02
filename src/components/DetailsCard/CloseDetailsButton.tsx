// 'use client';

// import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';
import searchString from '../../utils/searchString';

export default function CloseDetailsButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.push(searchString(router))}>
      Hide details
    </button>
  );
}
