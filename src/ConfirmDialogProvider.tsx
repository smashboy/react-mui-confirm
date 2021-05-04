import React from 'react';
import { ConfirmDialog } from './ConfirmDialog';
import { ConfirmOptions, FinalOptions, GlobalOptions, HandleConfirm } from './types';
import { handleOverrideOptions } from './defaultOptions';
import { useTimer } from './useTimer';

export const ConfirmContext = React.createContext<HandleConfirm | null>(null);

export const ConfirmDialogProvider: React.FC<GlobalOptions> = ({ children, ...globalOptoins }) => {
  const [promise, setPromise] = React.useState<{
    resolve?: (value?: any) => void;
    reject?: () => void;
  }>({});

  const [finalOptions, setFinalOptions] = React.useState<FinalOptions>({});
  const [timerProgress, setTimerProgress] = React.useState(0);
  const [timerIsRunning, setTimerIsRunning] = React.useState(false);

  const timer = useTimer({
    onTimeEnd: () => handleCancel(),
    onTimeTick: timeLeft => setTimerProgress((100 * timeLeft) / finalOptions.timer!),
  });

  const confirm = React.useCallback((confirmOptions?: ConfirmOptions) => {
    return new Promise((resolve, reject) => {
      const finalOptions = handleOverrideOptions(globalOptoins, confirmOptions);
      setFinalOptions(finalOptions);
      setPromise({ resolve, reject });

      if (finalOptions?.timer) {
        setTimerIsRunning(true);
        timer.start(finalOptions.timer);
      }
    });
  }, []);

  const handleStopTimer = React.useCallback(() => {
    if (timerIsRunning) {
      setTimerIsRunning(false);
      setTimerProgress(0);
      timer.stop();
    }
  }, [timerIsRunning]);

  const handleResolveAndClear = React.useCallback(() => {
    promise?.resolve?.();
    setPromise({});
  }, [promise]);

  const handleRejectAndClear = React.useCallback(
    (disableClose?: boolean) => {
      promise?.reject?.();
      if (disableClose) return;
      setPromise({});
    },
    [promise]
  );

  const handleClose = React.useCallback(() => {
    handleStopTimer();
    handleResolveAndClear();
  }, [handleResolveAndClear, handleStopTimer]);

  const handleConfirm = React.useCallback(async () => {
    try {
      handleStopTimer();

      await finalOptions?.onConfirm?.();
      handleResolveAndClear();
    } catch (error) {
      handleRejectAndClear(Boolean(finalOptions?.confirmText));
    }
  }, [handleResolveAndClear, handleRejectAndClear, finalOptions, timerIsRunning, handleStopTimer]);

  const handleCancel = React.useCallback(() => {
    handleStopTimer();
    if (finalOptions?.disableRejectOnCancel) {
      handleResolveAndClear();
      return;
    }
    handleRejectAndClear();
  }, [handleResolveAndClear, handleRejectAndClear, finalOptions, handleStopTimer]);

  return (
    <React.Fragment>
      <ConfirmContext.Provider value={confirm}>{children}</ConfirmContext.Provider>
      <ConfirmDialog
        show={Object.keys(promise).length === 2}
        progress={timerProgress}
        onCancel={handleCancel}
        onClose={handleClose}
        onConfirm={handleConfirm}
        finalOptions={finalOptions}
      />
    </React.Fragment>
  );
};
