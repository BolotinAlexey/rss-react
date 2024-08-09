'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  const router = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  const back = () => router.push('/?page=1&search=');

  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => back()}>Come Back</button>
    </div>
  );
}
