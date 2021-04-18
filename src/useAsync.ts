import React from 'react';

type UnknownResult = unknown;
type UnknownArgs = any[];

export const useAsync = <R = UnknownResult, Args extends any[] = UnknownArgs>(
  asyncFunction: (...args: Args) => Promise<R>
) => {
  const [loading, setLoading] = React.useState(false);

  const execute = async (...params: Args): Promise<void> => {
    try {
      setLoading(true);
      await asyncFunction(...params);
    } finally {
      setLoading(false);
    }
  };

  return { execute, loading };
};
