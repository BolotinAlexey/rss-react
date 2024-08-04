import { useEffect, useState } from 'react';
import CloseDetailsButton from '../../components/DetailsCard/CloseDetailsButton';
import { IPlanet } from '../../interfaces';
import transformPropsArrayToString from '../../utils/transformPropsArrayToString';
import { useDispatch } from 'react-redux';

import { setCurrentCard } from '../../store/slices/currentCardSlice';

export default function details({ planet }: { planet: IPlanet }) {
  const [filmTitles, setFilmTitles] = useState('');
  const [residentNames, setResidentNames] = useState('');
  const dispatch = useDispatch();
  const { url, name, films, residents, created, edited, ...restProps } = planet;

  useEffect(() => {
    const fetchData = async () => {
      if (planet?.films) {
        const filmTitles = await transformPropsArrayToString(
          planet.films,
          'title'
        );
        setFilmTitles(filmTitles);
      }
      if (planet?.residents) {
        const residentNames = await transformPropsArrayToString(
          planet.residents,
          'name'
        );
        setResidentNames(residentNames);
      }
    };

    fetchData();
  }, [planet]);

  useEffect(() => {
    if (planet) {
      dispatch(setCurrentCard(planet));
    }
  }, [planet, dispatch]);

  if (!planet) return null;

  const transformProps = {
    ...restProps,
    created: created.toString().slice(0, 10),
    edited: edited.toString().slice(0, 10),
  };

  return (
    <section className="section details">
      <h2 className="details__titles">Details</h2>
      <h3 className="card__title-details">
        Planet: <i>{name}</i>
      </h3>
      {Object.keys(transformProps).map((key) => {
        const k = key as keyof typeof transformProps;
        return (
          <p className="card__item-details" key={k.toString()}>
            <b>{k.toString()}</b>: {String(transformProps[k])}
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
          <a role="link" href={url}>
            link
          </a>
        </p>
      )}
      <CloseDetailsButton />
    </section>
  );
}
