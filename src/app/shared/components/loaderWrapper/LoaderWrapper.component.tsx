import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';

interface LoaderWrapperProps {
  loading: boolean;
  children: any;
  error?: any;
}

const LoaderWrapper: React.FC<LoaderWrapperProps> = ({children, loading, error}) => {
  return (
    <>
      {loading ? (
        <div style={{display: 'flex', flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <CircularProgress color="secondary" size={22} />
        </div>
      ) : (
        children
      )}
    </>
  );
};

export default LoaderWrapper;
