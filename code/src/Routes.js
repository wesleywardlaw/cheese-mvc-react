import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CategoriesView from './views/CategoriesView';
import CheesesView from './views/CheesesView';

const Routes = () => (
    <Switch>
        {/* we will implement these Route components later */}
        <Route path="/categories" component={CategoriesView} />
        <Route path="/cheeses" component={CheesesView} />
    </Switch>
);

export default Routes;
