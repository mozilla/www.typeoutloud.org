/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-enable no-unused-vars*/
import ReactDOM from 'react-dom';
import { Router, browserHistory } from 'react-router';
import routes from './routes.js';

function createElement(Component, props) {

  return (
    <Component {...props}/>
  );
}

ReactDOM.render(
  <Router createElement={createElement} history={browserHistory}>
    {routes}
  </Router>,
  document.querySelector("#my-app")
);

