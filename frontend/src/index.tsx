// @ts-ignore
require.context('../public/', true);

import * as ReactDom from 'react-dom';
import * as React from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { App } from './components/App';

ReactDom.render(
     <App/>,
  document.getElementById('app-root'));
