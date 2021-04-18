<h1 align="center">React Material-UI Confirm</h1>

<div align="center">
  
React Hooks based confirm dialog component built for [@material-ui/core](https://material-ui.com/).

## Examples

## Getting Started

React-mui-confirm is available as an npm package.

```sh
// with npm
npm install react-mui-confirm

// with yarn
yarn add react-mui-confirm
```

### Setup

1. Wrap your app with `ConfirmDialogProvider` component. See available options below.


```jsx
import { ConfirmDialogProvider } from 'react-mui-confirm';

return (
  <ConfirmDialogProvider>
    <App />
  </ConfirmDialogProvider>
)
```
2. If you're using material-ui `ThemeProvider`, make sure `ConfirmDialogProvider` is a child of it.
  
```jsx
import { ThemeProvider } from '@material-ui/core/styles';
import { ConfirmDialogProvider } from 'react-mui-confirm';

return (
  <ThemeProvider theme={theme}>
    <ConfirmDialogProvider>
      <App />
    </ConfirmDialogProvider>
  </ThemeProvider>
)
```

3. Import `useConfirmDialog` hook wherever you need the confirm dialog.

```jsx
import React from 'react';
import Button from '@material-ui/core/Button';
import { useConfirmDialog } from 'react-mui-confirm';

const Item = () => {
  const confirm = useConfirmDialog();

  const handleClick = () =>
    confirm({
      title: 'Are you sure you want to confirm this thingy?',
    });

  return (
    <Button onClick={handleClick}>
      Click
    </Button>
  );
};

export default Item;
```

## Options

### `ConfirmDialogProvider`

```ts
type GlobalOptions = {
  confirmButtonText?: string;
  cancelButtonText?: string;
  disableRejectOnCancel?: boolean; 
  // By default if user clicks cancel or if you use timer option and time runs out, confirm dialog will throw an error
  // You can disable this behaviour by setting disableRejectOnCancel to TRUE
  dialogProps?: Partial<MUIDialogProps>;
  dialogTitleProps?: Partial<DialogTitleProps>;
  dialogContentProps?: Partial<DialogContentProps>;
  dialogContentTextProps?: Partial<DialogContentTextProps>;
  dialogActionsProps?: Partial<DialogActionsProps>;
  confirmTextFieldProps?: Partial<TextFieldProps>;
  timerProgressProps?: Partial<LinearProgressProps>;
  confirmButtonProps?: Partial<ButtonProps>;
  cancelButtonProps?: Partial<ButtonProps>;
};
```

### `useConfirmDialog() => confirm`

This hook returns the confirm function and doest not take any props.

### `confirm([ConfirmOptions]) => Promise`

Confirm function can except `GlobalOptions`, but be aware they will override options from `ConfirmDialogProvider`.

```ts
type ConfirmOptions = GlobalOptions & {
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  timer?: number;
  onConfirm?: () => Promise<void> | void;
};
```
