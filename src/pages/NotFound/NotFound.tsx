import { useNavigate } from 'react-router-dom';

export default function NotFound() {
  const navigate = useNavigate();
  return (
    <div className="not-found">
      <p>Not Found Page</p>
      <button onClick={() => navigate('/')}>go Home</button>
    </div>
  );
}
