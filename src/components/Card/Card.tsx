import { useDispatch, useSelector } from 'react-redux';
import { IPlanet } from '../../interfaces';
import searchLastNumber from '../../utils/searchLastNumber';
import './card.css';
import { useLocation, useNavigate } from 'react-router-dom';
import { RootState } from '../../store/store';
import { addCard, removeCard } from '../../store/slices/cardsSlice';

export default function Card(planet: IPlanet) {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const id = searchLastNumber(planet.url);
  const path = `/details/${id}/?${params.toString()}`;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedCards = useSelector(
    (state: RootState) => state.cards.selectedCards
  );
  const isSelected = selectedCards.some((card) => card.name === planet.name);

  const handleClick = () => {
    // dispatch(setCurrentCardId(planet.name));
    // dispatch(setCurrentCard(planet));
    navigate(path);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      dispatch(addCard(planet));
    } else {
      dispatch(removeCard(planet.name));
    }
  };

  return (
    <div className="card__wrap" onClick={handleClick}>
      <h3 className="card__title">
        Planet: <i>{planet.name}</i>
      </h3>
      <input type="checkbox" checked={isSelected} onChange={handleSelect} />
    </div>
  );
}
