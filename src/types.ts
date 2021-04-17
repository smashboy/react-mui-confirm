import {
  DialogProps as MUIDialogProps,
  ButtonProps,
  DialogTitleProps,
  TextFieldProps,
  DialogContentTextProps,
  DialogActionsProps,
  DialogContentProps,
  LinearProgressProps,
} from '@material-ui/core';
import { handleOverrideOptions } from './defaultOptions';

export type GlobalOptions = {
  confirmButtonText?: string;
  cancelButtonText?: string;
  disableRejectOnCancel?: boolean;
  dialogProps?: Partial<MUIDialogProps>;
  dialogTitleProps?: Partial<DialogTitleProps>;
  dialogContentProps?: Partial<DialogContentProps>;
  dialogContentTextProps?: Partial<DialogContentTextProps>;
  dialogActoinsProps?: Partial<DialogActionsProps>;
  confirmTextFieldProps?: Partial<TextFieldProps>;
  timerProgressProps?: Partial<LinearProgressProps>;
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
};

export type ConfirmOptions = GlobalOptions & {
  title?: string;
  description?: React.ReactNode;
  confirmText?: string;
  timer?: number;
  // dialogContent?: TODO
  onConfirm?: () => Promise<void> | void;
};

export type FinalOptions = ReturnType<typeof handleOverrideOptions>;

export type HandleConfirm = (options?: ConfirmOptions) => void;

export type DialogProps = {
  show: boolean;
  finalOptions: FinalOptions;
  progress: number;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => void;
};

export type UseTimerProps = {
  onTimeEnd?: () => void;
  onTimeTick?: (timeLeft: number) => void;
};
