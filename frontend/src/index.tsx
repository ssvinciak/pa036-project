// @ts-ignore
require.context('../public/', true);

import * as ReactDom from 'react-dom';
import * as React from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import './utils/DateExtensions';
import 'typeface-roboto';

import { App } from './components/App';

ReactDom.render(
  <App />,
  document.getElementById('app-root'));
