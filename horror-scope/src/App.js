import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Pages/landing';
import Movie from './Pages/movie';
import Profile from './Pages/profile';
import Results from './Pages/results';


class App extends Component {
  
  render() {

    return (
      <Router>
        
        <div>
        
          <Switch>
            <Route exact path="/" component={Landing} />
            {/* <Route path="/movie/:movieId" component={Movie} />
            <Route path="/profile" component={Profile} /> */}
            <Route exact path="/search/:name" component={Results} /> 
          </Switch>
        
        </div>
        
      </Router>
    );
  };
}

export default App;

