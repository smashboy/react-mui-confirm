import { ConfirmContext } from 'ConfirmDialogProvider';
import React from 'react';

export const useConfirmDialog = () => {
  const confirm = React.useContext(ConfirmContext);

  if (!confirm)
    throw new Error(
      'useConfirmDialog must be used within a ConfirmDialogProvider'
    );

  return confirm;
};
