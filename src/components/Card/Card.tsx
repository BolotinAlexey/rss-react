import { IPlanet } from '../../interfaces';
import searchLastNumber from '../../utils/searchLastNumber';
import './card.css';
import { NavLink, useLocation } from 'react-router-dom';

export default function Card(planet: IPlanet) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = searchLastNumber(planet.url);
  const path = `/details/${id}/?${params.toString()}`;

  return (
    <NavLink to={path}>
      <h3 className="card__title">
        Planet: <i>{planet.name}</i>
      </h3>
    </NavLink>
  );
}
