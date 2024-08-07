import React from 'react';
import useLoading from '../hooks/useLoading';

const UseLoadingComponent: React.FC = () => {
  const [isLoading] = useLoading();
  return (
    <div>
      <p data-testid="loading-status">
        {isLoading ? 'Loading...' : 'Not Loading'}
      </p>
    </div>
  );
};

export default UseLoadingComponent;
