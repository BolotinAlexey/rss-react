import { NextParsedUrlQuery } from 'next/dist/server/request-meta';
import useLS from '../hooks/useLS';
import { mockRouterFn } from './mockData';

export const TestComponent = ({ query }: { query: NextParsedUrlQuery }) => {
  const [name, setName] = useLS(mockRouterFn(query));

  return (
    <div>
      <p data-testid="name">{name}</p>
      <button onClick={() => setName('newValue')}>Update Name</button>
    </div>
  );
};
