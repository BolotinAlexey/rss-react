import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import useLS from '../hooks/useLS';
import { mockRouter } from './mockData';

export const TestComponent = ({ query }: { query: NextParsedUrlQuery }) => {
  const [name, setName] = useLS(mockRouter(query));

  return (
    <div>
      <p data-testid="name">{name}</p>
      <button onClick={() => setName('newValue')}>Update Name</button>
    </div>
  );
};
