import { IFilm, IPeople } from '../interfaces';

export default async function transformPropsArrayToString(
  arr: string[] | IPeople[] | IFilm[],
  name: 'title' | 'name'
): Promise<string> {
  const requests = arr.map((url) => fetch(String(url)));
  const responses = await Promise.all(requests);

  const result: string[] = await Promise.all(
    responses.map(async (response) => {
      const data: IPeople | IFilm = await response.json();
      if (isIFilm(data) && name === 'title') {
        return data.title;
      } else if (isIPeople(data) && name === 'name') {
        return data.name;
      }
      throw new Error(`Property ${name} does not exist on the provided data.`);
    })
  );

  return result.join(', ');
}

function isIFilm(data: IFilm | IPeople): data is IFilm {
  return (data as IFilm).title !== undefined;
}

function isIPeople(data: IFilm | IPeople): data is IPeople {
  return (data as IPeople).name !== undefined;
}
