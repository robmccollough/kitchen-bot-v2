import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Root from './components/new/root';
import store from '../src/redux/store'

import * as serviceWorker from './serviceWorker';


ReactDOM.render(<Root/>, document.querySelector('#root'));
  

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
