import React from 'react';
import { Switch, Route } from 'react-router-dom';

import MenusView from './views/MenusView';
import CheesesView from './views/CheesesView';
import CategoriesView from './views/CategoriesView';

const Routes = () => (
  <Switch>
    <Route exact path='/menus' component={MenusView} />
    <Route exact path='/cheeses' component={CheesesView} />
    <Route exact path='/categories' component={CategoriesView} />
  </Switch>
);

export default Routes;
