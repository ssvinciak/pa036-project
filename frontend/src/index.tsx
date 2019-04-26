import { ResultGraph } from './components/ResultGraph';
//@ts-ignore
require.context('../public/', true);

import { Provider } from 'react-redux';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import * as ReactDom from 'react-dom';
import * as React from 'react';

import { store } from './store/store';

ReactDom.render(
  <Provider store={store}>
    <ResultGraph />
  </Provider>,
  document.getElementById('app-root'));
