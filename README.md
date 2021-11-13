<h1 align="center">React Material-UI Confirm</h1>

<div align="center">
  
React Hooks based confirm dialog component built for [@material-ui/core](https://material-ui.com/).

</div>

## Examples

[Codesandbox Demo](https://codesandbox.io/s/react-material-ui-confirm-examples-19c0i)

## Requirements

```sh
// React
>=16 || alpha

// Material UI
@emotion/react: >=11
@emotion/styled: >=11
@mui/material: >=5.0.0
```

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
  enableRejectOnCancel?: boolean;
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
```

### `useConfirmDialog() => confirm`

This hook returns the confirm function and doest not take any props.

### `confirm([ConfirmOptions]) => Promise`

Confirm function can accept `GlobalOptions`, but be aware they will override options from `ConfirmDialogProvider`.

```ts
type ConfirmOptions = GlobalOptions & {
  title: string;
  description?: React.ReactNode;
  confirmText?: string;
  timer?: number;
  onConfirm?: () => Promise<void> | void;
};
```
