import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import Routes from './Routes';
import CheeseNav from './components/CheeseNav';
import Footer from './components/Footer';

class App extends Component {
  render() {
    return (
      <Router>
        {/* <Fragment> can be replaced with the <> shorthand */}
        <Fragment>
          <CheeseNav />
          <Routes />
          <Footer />
        </Fragment>
      </Router>
    );
  }
}

export default App;
