import {
  DialogProps as MUIDialogProps,
  ButtonProps,
  DialogTitleProps,
  TextFieldProps,
  DialogContentTextProps,
  DialogActionsProps,
  DialogContentProps,
} from '@material-ui/core';
import { handleOverrideOptions } from 'defaultOptions';

export type GlobalOptions = {
  confirmButtonText?: string;
  cancelButtonText?: string;
  disableRejectOnCancel?: boolean;
  dialogProps?: MUIDialogProps;
  dialogTitleProps?: DialogTitleProps;
  dialogContentProps?: DialogContentProps;
  dialogContentTextProps?: DialogContentTextProps;
  dialogActoinsProps?: DialogActionsProps;
  confirmTextFieldProps?: TextFieldProps;
  confirmButtonProps?: ButtonProps;
  cancelButtonProps?: ButtonProps;
};

export type ConfirmOptions = GlobalOptions & {
  title?: string;
  description?: string;
  confirmText?: string;
  // dialogContent?: TODO
  onConfirm?: () => Promise<void> | void;
};

export type FinalOptions = ReturnType<typeof handleOverrideOptions>;

export type HandleConfirm = (options?: ConfirmOptions) => void;

export type DialogProps = {
  show: boolean;
  finalOptions: FinalOptions;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => void;
};
