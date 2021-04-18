import { GlobalOptions, ConfirmOptions, FinalOptions } from './types';

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

export const handleOverrideOptions = (
  globalOptions?: GlobalOptions,
  confirmOptions?: ConfirmOptions
): FinalOptions => ({
  ...defaultGlobalOptions,
  ...globalOptions,
  ...confirmOptions,
});
