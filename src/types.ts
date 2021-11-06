import {
  DialogProps as MUIDialogProps,
  ButtonProps,
  DialogTitleProps,
  TextFieldProps,
  DialogContentTextProps,
  DialogActionsProps,
  DialogContentProps,
  LinearProgressProps,
} from '@mui/material';

export type GlobalOptions = {
  confirmButtonText?: string;
  cancelButtonText?: string;
  rejectOnCancel?: boolean;
  dialogProps?: Omit<MUIDialogProps, "open" | "onClose">;
  dialogTitleProps?: DialogTitleProps;
  dialogContentProps?: DialogContentProps;
  dialogContentTextProps?: DialogContentTextProps;
  dialogActionsProps?: DialogActionsProps;
  confirmTextFieldProps?: Omit<TextFieldProps, "onChange" | "value">;
  timerProgressProps?: Partial<LinearProgressProps>;
  confirmButtonProps?: Omit<ButtonProps, "onClick" | "disabled">;
  cancelButtonProps?: Omit<ButtonProps, "onClick">;
};

export type ConfirmOptions = GlobalOptions & {
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  timer?: number;
  // dialogContent?: TODO
  onConfirm?: () => Promise<void> | void;
};

export type FinalOptions = Partial<GlobalOptions & ConfirmOptions>;

export type HandleConfirm = (options?: ConfirmOptions) => void;

export type DialogProps = {
  show: boolean;
  finalOptions: FinalOptions;
  progress: number;
  onCancel: () => void;
  onClose: () => void;
  onConfirm: () => Promise<void>;
};

export type UseTimerProps = {
  onTimeEnd?: () => void;
  onTimeTick?: (timeLeft: number) => void;
};
