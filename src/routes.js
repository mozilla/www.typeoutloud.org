/*eslint-disable no-unused-vars*/
import React from 'react';
/*eslint-disable no-unused-vars*/

import { Route, IndexRedirect, Redirect } from 'react-router';

var routes = (
  <Route path="/">
    <IndexRedirect to='net-neutrality'/>
    <Route path='net-neutrality' component={require('./pages/net-neutrality.js')}/>
    <Route path='internethealth' component={require('./pages/internethealth.js')}/>
    <Route path='science' component={require('./pages/science.js')}/>
    <Redirect from="*" to="/" />
  </Route>
);

module.exports = routes;
