import { useRouter } from 'next/router';

export default function CloseDetailsButton() {
  const router = useRouter();
  console.log(router);

  const changePath = () => {
    const { query, push } = router;
    const homePath =
      '/?' +
      Object.keys(query)
        .map((q) => `${q}=${query[q]}`)
        .join('&');
    console.log(homePath);
    push(homePath);
  };

  return <button onClick={changePath}>Hide details</button>;
}
