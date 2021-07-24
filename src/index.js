/*
    挂载根节点
*/

import React from 'react';
import { render } from 'react-dom';
import RouterConfig from './router/routes';
import './static/css/index.css';

render((
  <RouterConfig ></RouterConfig>
), document.getElementById('react-container'));
