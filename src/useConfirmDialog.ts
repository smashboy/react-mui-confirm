import React from 'react';
import { ConfirmContext } from './ConfirmDialogProvider';

export const useConfirmDialog = () => {
  const confirm = React.useContext(ConfirmContext);

  if (!confirm)
    throw new Error(
      'useConfirmDialog must be used within a ConfirmDialogProvider'
    );

  return confirm;
};

export const useTest = () => {
  const [state] = React.useState(false);

  return state;
};
