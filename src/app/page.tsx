import Main from '../components/Main';
import { IPlanet, IPlanetResponse, PlanetArrayDetails } from '../interfaces';
import { getDetails, getPage } from '../service/api';
import transformPropsArrayToString from '../utils/transformPropsArrayToString';

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  try {
    const { page, search, details } = searchParams;
    const resp = (await getPage(
      Number.parseInt(page?.toString() ?? '1'),
      search?.toString() ?? ''
    )) as IPlanetResponse;

    const planet: IPlanet | null = details
      ? ((await getDetails(details.toString() ?? '1')) as IPlanet)
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
      <Main
        response={resp}
        planet={planet}
        planetArrayDetails={planetArrayDetails}
      />
    );
  } catch (error: unknown) {
    throw new Error('Error on server' + error);
  }
}
