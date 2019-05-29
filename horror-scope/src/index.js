import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import Landing from './Pages/landing';
import Profile from './Pages/profile';
const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/landing" component={Landing} />
        <Route path="/profile" component={Profile} />
        
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))