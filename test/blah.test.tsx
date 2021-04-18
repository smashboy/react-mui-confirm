import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ConfirmDialogProvider } from '../src';

describe('it', () => {
  it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ConfirmDialogProvider />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
