import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from '@remix-run/react';
import { resetCurrentCard } from '../../store/slices/currentCardSlice';

export default function CloseDetailsButton() {
  const dispatch = useDispatch();
  const { search } = useLocation();
  const navigate = useNavigate();

  const changePath = () => {
    navigate(`/${search}`);
    dispatch(resetCurrentCard());
  };

  return <button onClick={changePath}>Hide details</button>;
}
