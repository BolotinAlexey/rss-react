import { useRouter, useSearchParams } from 'next/navigation';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';

export default function CloseDetailsButton() {
  const router = useRouter();
  const query = useSearchParams();
  return (
    <button onClick={() => router.push(setNewPathWithoutDetails(query))}>
      Hide details
    </button>
  );
}
