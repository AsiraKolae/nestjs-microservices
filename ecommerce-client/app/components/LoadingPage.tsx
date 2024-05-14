"use client"
import { useState, useEffect } from 'react';
import LoadingIndicator from './LoadingIndicator';

const LoadingPage: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    return () => clearTimeout(timeout);
  }, []);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  return (
    <></>
  );
};

export default LoadingPage;
