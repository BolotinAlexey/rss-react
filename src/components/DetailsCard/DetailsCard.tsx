import { useEffect, useState } from 'react';
import { IPlanet } from '../../interfaces';
import transformPropsArrayToString from '../../utils/transformPropsArrayToString';
import { useLoaderData } from 'react-router-dom';

import './detailsCard.css';

export default function DetailsCard() {
  const planet = useLoaderData() as IPlanet;
  const [filmTitles, setFilmTitles] = useState('');
  const [residentNames, setResidentNames] = useState('');
  const { url, name, films, residents, created, edited, ...restProps } = planet;

  const transformProps = {
    ...restProps,
    created: created.toString().slice(0, 10),
    edited: edited.toString().slice(0, 10),
  };

  useEffect(() => {
    const fetchData = async () => {
      if (films) {
        const filmTitles = await transformPropsArrayToString(films, 'title');
        setFilmTitles(filmTitles);
      }
      if (residents) {
        const residentNames = await transformPropsArrayToString(
          residents,
          'name'
        );
        setResidentNames(residentNames);
      }
    };

    fetchData();
  });

  return (
    <section className="section details">
      <h2 className="details__titles">Details</h2>
      <h3 className="card__title">
        Planet: <i>{name}</i>
      </h3>
      {Object.keys(transformProps).map((key) => {
        const k = key as keyof typeof transformProps;
        return (
          <p key={k}>
            <b>{k}</b>: {String(transformProps[k])}
          </p>
        );
      })}
      {!!films?.length && (
        <p>
          <b>films:</b> [{filmTitles}]
        </p>
      )}
      {!!residents?.length && (
        <p>
          <b>residents:</b> [{residentNames}]
        </p>
      )}
      {!!url && <a href={url}>link</a>}
    </section>
  );
}
