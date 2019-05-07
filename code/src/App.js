import React, { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import CheeseNav from './components/CheeseNav';
import Footer from './components/Footer';

import Routes from './Routes';

const App = () => (
    <Router>
        <Fragment>
            <CheeseNav />
            <Routes />
            <Footer />
        </Fragment>
    </Router>
);

export default App;
