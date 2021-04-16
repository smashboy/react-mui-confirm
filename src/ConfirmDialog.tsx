import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core';
import { LoadingButton } from 'LoadingButton';
import { DialogProps } from 'types';
import { defaultConfirmOptions, defaultGlobalOptions } from 'defaultOptions';

const initialConfirmInputState = {
  value: '',
  isMatched: false,
};

export const ConfirmDialog: React.FC<DialogProps> = ({
  show,
  onClose,
  onCancel,
  onConfirm,
  finalOptions,
}) => {
  const [confirmInput, setConfirmInput] = React.useState(
    initialConfirmInputState
  );

  const handleCancelOnClose = (handler: () => void) => {
    handler();
    setConfirmInput(initialConfirmInputState);
  };

  const handleConfirmInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.currentTarget.value;

    setConfirmInput({
      value: inputValue,
      isMatched: finalOptions?.confirmText === inputValue,
    });
  };

  return (
    <Dialog
      open={show}
      onClose={() => handleCancelOnClose(onClose)}
      {...finalOptions.dialogProps}
    >
      <DialogTitle {...finalOptions.dialogTitleProps}>
        {finalOptions?.title || defaultConfirmOptions.title}
      </DialogTitle>
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
      <DialogActions>
        <Button
          {...finalOptions.cancelButtonProps}
          onClick={() => handleCancelOnClose(onCancel)}
        >
          {finalOptions?.cancelButtonText ||
            defaultGlobalOptions.cancelButtonText}
        </Button>
        <LoadingButton
          {...finalOptions.confirmButtonProps}
          onClick={onConfirm}
          // disabled={confirmText ? confirmInput !== confirmText : false}
          // className={classes.dangerBtn}
          // onClick={handleSubmit.execute}
          // isLoading={handleSubmit.loading}
        >
          {finalOptions?.confirmButtonText ||
            defaultGlobalOptions.confirmButtonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
};
