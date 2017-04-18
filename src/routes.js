/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/

import { Route, IndexRoute, Redirect } from 'react-router';

var routes = (
  <Route path="/">
    <IndexRoute component={require('./pages/internethealth.js')}/>
    <Route path='internethealth' component={require('./pages/internethealth.js')}/>
    <Route path='abort' component={require('./pages/abort.js')}/>
    <Redirect from="*" to="/" />
  </Route>
);

module.exports = routes;

