import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Landing from './Pages/landing';
import Movie from './Pages/movie';
import Profile from './Pages/profile';
import Results from './Pages/results';


class App extends Component {
  
  state = {
    isLoggedIn: false,
    userName: "",
  };

  componentDidMount()
  {
    var userName = sessionStorage.getItem('userName');
    var isLoggedIn = sessionStorage.getItem('isLoggedIn');
    this.setState ({ userName: userName, isLoggedIn: isLoggedIn });
  };

  handleLoggedIn = (name) =>
  {
    this.setState ({ userName: name, isLoggedIn: true });
    sessionStorage.setItem('userName', name);
    sessionStorage.setItem('isLoggedIn', true);
  };

  render() {

    return (
      <Router>
        
        <div>
        
          <Switch>
            <Route exact path="/" 
              render={(props) => <Landing {...props} 
              onLogin={this.handleLoggedIn} 
              userName={this.state.userName} 
              isLoggedIn={this.state.isLoggedIn}/>}
            />
            <Route exact path="/movie/:movieId" 
              render={(props) => <Movie {...props}
              onLogin={this.handleLoggedIn}
              userName={this.state.userName}
              isLoggedIn={this.state.isLoggedIn}/>} 
            />
            <Route  exact path="/profile" 
              render={(props) => <Profile {...props}
              userName={this.state.userName}
              isLoggedIn={this.state.isLoggedIn}/>} 
            />}
            <Route exact path="/search/:name" 
              render={(props) => <Results {...props}
              onLogin={this.handleLoggedIn}
              userName={this.state.userName}
              isLoggedIn={this.state.isLoggedIn}/>} 
              /> 


          </Switch>
        
        </div>
        
      </Router>
    );
  };
}

export default App;

