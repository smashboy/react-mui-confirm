import React from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import {
  ConfirmOptions,
  FinalOptions,
  GlobalOptions,
  HandleConfirm,
} from './types';
import { handleOverrideOptions } from './defaultOptions';
import { useTimer } from './useTimer';

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
  const [timerProgress, setTimerProgress] = React.useState(0);

  const timer = useTimer({
    onTimeEnd: () => handleCancel(),
    onTimeTick: timeLeft =>
      setTimerProgress((100 * timeLeft) / finalOptions.timer!),
  });

  const confirm = React.useCallback((confirmOptions?: ConfirmOptions) => {
    return new Promise((resolve, reject) => {
      const finalOptions = handleOverrideOptions(globalOptoins, confirmOptions);
      setFinalOptions(finalOptions);
      setPromise({ resolve, reject });

      if (finalOptions?.timer) {
        timer.start(finalOptions.timer);
      }
    });
  }, []);

  const handleClose = React.useCallback(() => {
    setPromise({});
    timer.stop();
    setTimerProgress(0);
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
        progress={timerProgress}
        onCancel={handleCancel}
        onClose={handleClose}
        onConfirm={handleConfirm}
        finalOptions={finalOptions}
      />
    </ConfirmContext.Provider>
  );
};
