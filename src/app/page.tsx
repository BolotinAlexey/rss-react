// export const metadata: Metadata = {
//   title: 'StarWars planets',
//   description: 'Next.js app',
// };

import IndexPage from '../components/IndexPage';
import { IPlanet, PlanetArrayDetails } from '../interfaces';
import { getDetails, getPage } from '../service/api';
import transformPropsArrayToString from '../utils/transformPropsArrayToString';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const { page, search, details } = searchParams;
  const resp = await getPage(
    Number.parseInt(page?.toString() ?? '1'),
    search?.toString() ?? ''
  );

  const planet: IPlanet | null = details
    ? await getDetails(details.toString() ?? '1')
    : null;

  const planetArrayDetails: PlanetArrayDetails = {
    filmTitles: '',
    residentNames: '',
  };
  if (planet && planet?.films) {
    planetArrayDetails.filmTitles = await transformPropsArrayToString(
      planet.films,
      'title'
    );
  }

  if (planet && planet?.residents) {
    planetArrayDetails.residentNames = await transformPropsArrayToString(
      planet.residents,
      'name'
    );
  }
  return (
    <IndexPage
      response={resp}
      planet={planet}
      planetArrayDetails={planetArrayDetails}
    />
  );
}
