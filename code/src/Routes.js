import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CategoriesView from './views/CategoriesView';
import CheesesView from './views/CheesesView';
import MenusView from './views/MenusView';
import MenuView from './views/MenuView';
import HomeView from './views/HomeView';
const Routes = () => (
    <Switch>
        {/* we will implement these Route components later */}
        <Route path="/categories" component={CategoriesView} />
        <Route path="/cheeses" component={CheesesView} />
        <Route path="/menus/:menuID" component={MenuView} />
        <Route path="/menus" component={MenusView} />
        <Route path="/" component={HomeView} />
        {/* <Route path="/loading" component={Loading} /> */}
    </Switch>
);

export default Routes;
