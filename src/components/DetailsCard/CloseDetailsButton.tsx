import { useLocation, useNavigate } from 'react-router-dom';

export default function CloseDetailsButton() {
  const { search } = useLocation();
  const navigate = useNavigate();

  const changePath = () => navigate(`/${search}`, { replace: true });

  return <button onClick={changePath}>Hide details</button>;
}
