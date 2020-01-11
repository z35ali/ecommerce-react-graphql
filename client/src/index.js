import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import 'gestalt/dist/gestalt.css';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';
import Signin from './components/Signin';
import Checkout from './components/Checkout';
import Signup from './components/Signup';
import Navbar from './components/Navbar';
import Brews from './components/Brews';

const Root = () => (
  <Router>
    <React.Fragment>
      <Navbar />

      <Switch>
        <Route component={App} exact path='/' />
        <Route component={Signin} path='/signin' />
        <Route component={Signup} path='/signup' />
        <Route component={Checkout} path='/checkout' />
        <Route component={Brews} path='/:brandId' />
      </Switch>
    </React.Fragment>
  </Router>
);
ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();
