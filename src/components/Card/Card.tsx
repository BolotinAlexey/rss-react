// import { useEffect, useState } from 'react';
import { IPlanet } from '../../interfaces';
import searchLastNumber from '../../utils/searchLastNumber';
// import transformPropsArrayToString from '../../utils/transformPropsArrayToString';
import './card.css';
import { NavLink, useLocation } from 'react-router-dom';

export default function Card(planet: IPlanet) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = searchLastNumber(planet.url);
  const path = `/details/${id}/?${params.toString()}`;

  // const [filmTitles, setFilmTitles] = useState('');
  // const [residentNames, setResidentNames] = useState('');
  // const { url, name, films, residents, created, edited, ...restProps } = planet;

  // const transformProps = {
  //   ...restProps,
  //   created: created.toString().slice(0, 10),
  //   edited: edited.toString().slice(0, 10),
  // };

  // useEffect(() => {
  //   const fetchData = async () => {
  //     if (films) {
  //       const filmTitles = await transformPropsArrayToString(films, 'title');
  //       setFilmTitles(filmTitles);
  //     }
  //     if (residents) {
  //       const residentNames = await transformPropsArrayToString(
  //         residents,
  //         'name'
  //       );
  //       setResidentNames(residentNames);
  //     }
  //   };

  //   fetchData();
  // });

  return (
    <NavLink to={path}>
      <h3 className="card__title">
        Planet: <i>{planet.name}</i>
      </h3>
      {/* {Object.keys(transformProps).map((key) => {
        const k = key as keyof typeof transformProps;
        return (
          <p key={k}>
            <b>{k}</b>: {String(transformProps[k])}
          </p>
        );
      })} */}
      {/* {!!films?.length && (
        <p>
          <b>films:</b> [{filmTitles}]
        </p>
      )}
      {!!residents?.length && (
        <p>
          <b>residents:</b> [{residentNames}]
        </p>
      )} */}
      {/* {!!url && <a href={url}>link</a>} */}
    </NavLink>
  );
}
