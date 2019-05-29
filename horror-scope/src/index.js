import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { Route, Link, BrowserRouter as Router, Switch } from 'react-router-dom'
import App from './App';
import Movie from './Pages/movie';
import Profile from './Pages/profile';
import Results from './Pages/profile';

const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={App} />
        <Route path="/movie/:movieId" component={Movie} />
        <Route path="/profile" component={Profile} />
        <Route path="search/:name" component={Results} />
      </Switch>
    </div>
  </Router>
)
ReactDOM.render(routing, document.getElementById('root'))