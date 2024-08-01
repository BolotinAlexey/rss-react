import { useEffect, useState } from 'react';
import transformPropsArrayToString from '../../utils/transformPropsArrayToString';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';
import CloseDetailsButton from './CloseDetailsButton';
import { useTheme } from '../../hooks/useTheme';
import styleTheme from '../../utils/styleTheme';
import { useDispatch } from 'react-redux';
import { useGetDetailsQuery } from '../../service/apiRtk';
import { setCurrentCard } from '../../store/slices/currentCardSlice';

export default function DetailsCard() {
  const [theme] = useTheme();
  const themeStyles = styleTheme(theme);
  const [filmTitles, setFilmTitles] = useState('');
  const [residentNames, setResidentNames] = useState('');
  const dispatch = useDispatch();

  const params = useParams();
  const detailsNumber: string | undefined = params?.namePlanet;
  const id = detailsNumber ? Number(detailsNumber) : 0;

  const {
    data: planet,
    isFetching,
    error,
  } = useGetDetailsQuery({ id, skip: !id });

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

  if (error) return <>Error: {error.message}</>;
  if (!id || !planet) return null;

  const { url, name, films, residents, created, edited, ...restProps } = planet;

  const transformProps = {
    ...restProps,
    created: created.toString().slice(0, 10),
    edited: edited.toString().slice(0, 10),
  };

  return (
    <section style={themeStyles} className="section details">
      {isFetching || !planet ? (
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
        </>
      )}
    </section>
  );
}
