import { NextRouter } from 'next/router';

export default function searchString(router: NextRouter) {
  const { query } = router;
  const homePath =
    '/?' +
    Object.keys(query)
      .filter((el) => el !== 'id')
      .map((q) => `${q}=${query[q]}`)
      .join('&');
  return homePath;
}
