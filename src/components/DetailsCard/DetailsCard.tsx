import { useEffect } from 'react';
import CloseDetailsButton from '../../components/DetailsCard/CloseDetailsButton';
import { IPlanet, PlanetArrayDetails } from '../../interfaces';
import { setCurrentCard } from '../../store/slices/currentCardSlice';

import { useDispatch } from 'react-redux';

export default function DetailaCard({
  planet,
  planetArrayDetails,
}: {
  planet: IPlanet;
  planetArrayDetails: PlanetArrayDetails;
}) {
  const dispatch = useDispatch();
  const { url, name, films, residents, created, edited, ...restProps } = planet;

  useEffect(() => {
    if (planet) {
      dispatch(setCurrentCard(planet));
    }
  }, [planet, dispatch]);

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
      {planetArrayDetails && planetArrayDetails.filmTitles !== '' && (
        <p className="card__item-details">
          <b>films:</b> [{planetArrayDetails.filmTitles}]
        </p>
      )}
      {planetArrayDetails && planetArrayDetails.residentNames !== '' && (
        <p className="card__item-details">
          <b>residents:</b> [{planetArrayDetails.residentNames}]
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
