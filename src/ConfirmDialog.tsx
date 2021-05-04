import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  LinearProgress,
} from '@material-ui/core';
import { LoadingButton } from './LoadingButton';
import { DialogProps } from './types';
import { defaultGlobalOptions } from './defaultOptions';
import { useAsync } from './useAsync';

const initialConfirmInputState = {
  value: '',
  isMatched: false,
};

export const ConfirmDialog: React.FC<DialogProps> = ({
  show,
  progress,
  onClose,
  onCancel,
  onConfirm,
  finalOptions,
}) => {
  const [confirmInput, setConfirmInput] = React.useState(initialConfirmInputState);

  const confirm = useAsync(async () => {
    if (isConfirmDisabled) return;
    await onConfirm();
  });

  const isConfirmDisabled = Boolean(!confirmInput.isMatched && finalOptions?.confirmText);

  const handleCancelOnClose = React.useCallback((handler: () => void) => {
    handler();
    setConfirmInput(initialConfirmInputState);
  }, []);

  const handleConfirmInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    setConfirmInput({
      value: inputValue,
      isMatched: finalOptions?.confirmText === inputValue,
    });
  };

  return (
    <Dialog {...finalOptions.dialogProps} open={show} onClose={() => handleCancelOnClose(onClose)}>
      {progress > 0 && (
        <LinearProgress
          variant="determinate"
          value={progress}
          {...finalOptions.timerProgressProps}
        />
      )}
      <DialogTitle {...finalOptions.dialogTitleProps}>{finalOptions.title!}</DialogTitle>
      <DialogContent {...finalOptions.dialogContentProps}>
        {finalOptions?.description && (
          <DialogContentText {...finalOptions.dialogContentTextProps}>
            {finalOptions?.description}
          </DialogContentText>
        )}
        {finalOptions?.confirmText && (
          <TextField
            fullWidth
            {...finalOptions.confirmTextFieldProps}
            onChange={handleConfirmInput}
            value={confirmInput.value}
          />
        )}
      </DialogContent>
      <DialogActions {...finalOptions.dialogActionsProps}>
        <Button {...finalOptions.cancelButtonProps} onClick={() => handleCancelOnClose(onCancel)}>
          {finalOptions?.cancelButtonText || defaultGlobalOptions.cancelButtonText}
        </Button>
        <LoadingButton
          {...finalOptions.confirmButtonProps}
          onClick={confirm.execute}
          disabled={isConfirmDisabled}
          isLoading={confirm.loading}
        >
          {finalOptions?.confirmButtonText || defaultGlobalOptions.confirmButtonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
