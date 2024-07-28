import { useDispatch } from 'react-redux';
import { clearCards } from '../../../store/slices/cardsSlice';

export default function UnselectButton() {
  const dispatch = useDispatch();
  function unselectedHandler() {
    dispatch(clearCards());
  }

  return <button onClick={unselectedHandler}>Unselect all</button>;
}
