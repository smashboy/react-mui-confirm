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
} from '@mui/material';
import { LoadingButton } from './LoadingButton';
import { DialogProps } from './types';
import { defaultGlobalOptions } from './defaultOptions';

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
  const [loading, setLoading] = React.useState(false);

  const isConfirmDisabled = Boolean(!confirmInput.isMatched && finalOptions?.confirmText);

  const handleConfrirm = React.useCallback(async () => {
    try {
      if (isConfirmDisabled) return;
      setLoading(true);
      await onConfirm();
      setConfirmInput(initialConfirmInputState);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  }, [isConfirmDisabled, onConfirm]);

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
          onClick={handleConfrirm}
          disabled={isConfirmDisabled}
          isLoading={loading}
        >
          {finalOptions?.confirmButtonText || defaultGlobalOptions.confirmButtonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
