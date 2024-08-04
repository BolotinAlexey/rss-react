import { useRouter } from 'next/router';
import setNewPathWithoutDetails from '../../utils/setNewPathWithoutDetails';

export default function CloseDetailsButton() {
  const router = useRouter();
  const newPathWithoutDetails = setNewPathWithoutDetails(router);
  return (
    <button onClick={() => router.push(newPathWithoutDetails)}>
      Hide details
    </button>
  );
}
