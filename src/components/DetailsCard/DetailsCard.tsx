import { useEffect, useState } from 'react';
import { IPlanet } from '../../interfaces';
import transformPropsArrayToString from '../../utils/transformPropsArrayToString';
import { useLoaderData, useNavigation } from 'react-router-dom';

import './detailsCard.css';
import Loader from '../Loader';
import CloseDetailsButton from './CloseDetailsButton';

export default function DetailsCard() {
  const planet = useLoaderData() as IPlanet;
  const [filmTitles, setFilmTitles] = useState('');
  const [residentNames, setResidentNames] = useState('');
  const { url, name, films, residents, created, edited, ...restProps } = planet;
  const navigation = useNavigation();
  const isLoader =
    navigation.location && navigation.location.pathname.includes('details');

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
      {isLoader ? (
        <Loader />
      ) : (
        <>
          <h2 className="details__titles">Details</h2>
          <h3 className="card__title-details">
            Planet: <i>{name}</i>
          </h3>
          {Object.keys(transformProps).map((key) => {
            const k = key as keyof typeof transformProps;
            return (
              <p className="card__item-details" key={k}>
                <b>{k}</b>: {String(transformProps[k])}
              </p>
            );
          })}
          {!!films?.length && (
            <p className="card__item-details">
              <b>films:</b> [{filmTitles}]
            </p>
          )}
          {!!residents?.length && (
            <p className="card__item-details">
              <b>residents:</b> [{residentNames}]
            </p>
          )}
          {!!url && (
            <p className="card__item-details">
              <a href={url}>link</a>
            </p>
          )}
          <CloseDetailsButton />
        </>
      )}
    </section>
  );
}
