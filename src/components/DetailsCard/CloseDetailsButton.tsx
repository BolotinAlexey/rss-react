import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';

export default function CloseDetailsButton() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const changePath = () => {
    navigate(`/${search}`, { replace: true });
    dispatch(resetCurrentCard());
  };

  return <button onClick={changePath}>Hide details</button>;
}
