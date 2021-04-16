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
  const [promise, setPromise] = React.useState<[() => void, () => void] | []>(
    []
  );
  const [resolveDialog, rejectDialog] = promise;

  const [finalOptions, setFinalOptions] = React.useState<FinalOptions>({});

  const confirm = React.useCallback((confirmOptions?: ConfirmOptions) => {
    return new Promise((resolve, reject) => {
      setFinalOptions(handleOverrideOptions(globalOptoins, confirmOptions));
      setPromise([resolve, reject]);
    });
  }, []);

  const handleClose = React.useCallback(() => {
    setPromise([]);
    setFinalOptions({});
  }, []);

  const handleConfirm = React.useCallback(() => {
    finalOptions?.onConfirm?.();
    resolveDialog();
    handleClose();
  }, [resolveDialog, finalOptions]);

  const handleCancel = React.useCallback(() => {
    if (finalOptions?.disableRejectOnCancel) return resolveDialog();
    rejectDialog();
    handleClose();
  }, [rejectDialog, resolveDialog, finalOptions]);

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}
      <ConfirmDialog
        show={promise.length === 2}
        onCancel={handleCancel}
        onClose={handleClose}
        onConfirm={handleConfirm}
        finalOptions={finalOptions}
      />
    </ConfirmContext.Provider>
  );
};
