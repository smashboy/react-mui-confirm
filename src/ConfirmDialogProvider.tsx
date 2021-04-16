import React from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import {
  ConfirmOptions,
  FinalOptions,
  GlobalOptions,
  HandleConfirm,
} from './types';
import { handleOverrideOptions } from './defaultOptions';

export const ConfirmContext = React.createContext<HandleConfirm | null>(null);

export const ConfirmDialogProvider: React.FC<GlobalOptions> = ({
  children,
  ...globalOptoins
}) => {
  const [promise, setPromise] = React.useState<{
    resolve?: (value?: any) => void;
    reject?: () => void;
  }>({});

  const [finalOptions, setFinalOptions] = React.useState<FinalOptions>({});

  const confirm = React.useCallback((confirmOptions?: ConfirmOptions) => {
    return new Promise((resolve, reject) => {
      setFinalOptions(handleOverrideOptions(globalOptoins, confirmOptions));
      setPromise({ resolve, reject });
    });
  }, []);

  const handleClose = React.useCallback(() => {
    setPromise({});
  }, []);

  const handleConfirm = React.useCallback(() => {
    finalOptions?.onConfirm?.();
    promise?.resolve?.();
    handleClose();
  }, [promise, finalOptions]);

  const handleCancel = React.useCallback(() => {
    if (finalOptions?.disableRejectOnCancel) {
      promise?.resolve?.();
      handleClose();
      return;
    }
    promise?.reject?.();
    handleClose();
  }, [promise, finalOptions]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        show={Object.keys(promise).length === 2}
        onCancel={handleCancel}
        onClose={handleClose}
        onConfirm={handleConfirm}
        finalOptions={finalOptions}
      />
    </ConfirmContext.Provider>
  );
};
