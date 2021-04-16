import { GlobalOptions, ConfirmOptions } from 'types';

export const defaultGlobalOptions: GlobalOptions = {
  confirmButtonText: 'Confirm',
  cancelButtonText: 'Cancel',
  confirmButtonProps: {
    color: 'primary',
  },
  cancelButtonProps: {
    color: 'primary',
    autoFocus: true,
  },
};

export const defaultConfirmOptions: ConfirmOptions = {
  title: 'Are you sure?',
};

export const handleOverrideOptions = (
  globalOptions?: GlobalOptions,
  confirmOptions?: ConfirmOptions
) => ({
  ...defaultGlobalOptions,
  ...globalOptions,
  ...defaultConfirmOptions,
  ...confirmOptions,
});
