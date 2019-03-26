import 'primereact/resources/themes/nova-light/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Registration from './components/Registration';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route exact path="/" component={Login} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/registration" component={Registration} />
      </BrowserRouter>
    );
  }
}

export default App;
