import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Home } from './pages/Home';
import { Missing } from './pages/Missing';

export const Routes = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home}/>
      <Route component={Missing}/>
    </Switch>
  </Router>
);
