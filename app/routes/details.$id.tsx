import { json } from '@remix-run/react';
import DetailsCard from '../../src/components/DetailsCard';
import { getDetails } from '../../src/service/api';
import { LoaderFunctionArgs } from '@remix-run/node';

export const loader = async (req: LoaderFunctionArgs) => {
  const planet = await getDetails(req?.params?.id || '1');
  return json({ planet });
};
export default function details() {
  return <DetailsCard />;
}
