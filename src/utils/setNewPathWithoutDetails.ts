import { NextRouter } from 'next/router';

export default function setNewPathWithoutDetails(router: NextRouter) {
  const { page, search } = router.query;
  const newPathWithoutDetails = {
    pathname: router.pathname,
    query: { page, search },
  };
  return newPathWithoutDetails;
}
