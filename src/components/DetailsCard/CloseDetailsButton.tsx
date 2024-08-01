// 'use client';

// import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/router';

export default function CloseDetailsButton() {
  const router = useRouter();
  console.log(router);
  // const searchParams = useSearchParams();

  const changePath = () => {
    const { query, push } = router;
    const homePath =
      '/?' +
      Object.keys(query)
        .filter((el) => el !== 'id')
        .map((q) => `${q}=${query[q]}`)
        .join('&');
    console.log(homePath);
    push(homePath);
  };
  // const changePath = () => {
  //   const search = searchParams.get('search');

  //   console.log(searchParams);
  // };

  return <button onClick={changePath}>Hide details</button>;
}
