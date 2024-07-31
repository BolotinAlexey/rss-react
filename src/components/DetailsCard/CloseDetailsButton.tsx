import { useRouter } from 'next/router';

export default function CloseDetailsButton() {
  const router = useRouter();
  console.log(router);

  const changePath = () => {
    const homePath = router.asPath.replace('details', '');
    console.log(router);

    router.push(homePath);
  };

  return <button onClick={changePath}>Hide details</button>;
}
