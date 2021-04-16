import React from 'react';
import { Button, ButtonProps, CircularProgress } from '@material-ui/core';

export const LoadingButton: React.FC<{
  isLoading?: boolean;
  indicatorColor?: 'primary' | 'secondary' | 'inherit';
} & ButtonProps> = ({
  children,
  isLoading,
  disabled,
  indicatorColor,
  ...otherProps
}) => {
  return (
    <Button disabled={disabled || isLoading === true || false} {...otherProps}>
      {isLoading ? (
        <CircularProgress color={indicatorColor || 'primary'} size={25} />
      ) : (
        children
      )}
    </Button>
  );
};
