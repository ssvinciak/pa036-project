// @ts-ignore
require.context('../public/', true);

import { Provider } from 'react-redux';
import * as ReactDom from 'react-dom';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { App } from './components/App';
import { store } from './store/store';

ReactDom.render(
  <Provider store={store}>
     <App />
  </Provider>,
  document.getElementById('app-root'));
