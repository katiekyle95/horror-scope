import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import "./style.css";
import Loading from "./../results/loading.gif";
import { List, ListItem } from "../../Components/List";
import ResultCard from "./../../Components/result-cards";
import API from "./../../Utils/API";
import Loginbox from "../../Components/LogInForms";

function ResultContainer(props) {
    if ( props.isSearching )
    {
        return (
            <div className="results-here">
                <h2>Popular Now</h2>
                <div className="pop-load">
                    <img src={Loading}></img>
                </div>
            </div>
        )
    }

    return (
        <div className="results-here" >
            <h2>Popular Now</h2>
            {props.movies.length ? (
              <List>
                {props.movies.map(movie => (
                  <ListItem key={movie.id}>
                    <ResultCard 
                      movie={movie} 
                      watched={props.watched} 
                      wanted={props.wanted}
                      onWatched={props.onWatched}
                      onWanted={props.onWanted}
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <h3 id="no-results">No Results Found</h3>
            )}
        </div>
    )    
}


class Landing extends Component {

    state = {
        isOpen: false,
        isSearching: false,
        movies: [],
        isLog: false,
        isSignUp: false,
        
    };

    async componentDidMount() {
        var searchName = this.props.match.params.name;
        this.setState({ isSearching: true, searchName: searchName,} );
    
        try {
          var res = await API.movieDiscover();
          this.setState({ movies: res.data, isSearching: false })
        }
        catch (err)
        {
          console.log( err.message );
        }
        
        try {
          var userRes = await API.getUser( this.props.userName );
          this.setState( {watched: userRes.data.watched, wanted: userRes.data.wanted });
        }
        catch (err)
        {
          console.log( err.message );
        }
    
      }

      getUserData = async () =>
        {
            try {
            var userRes = await API.getUser( this.props.userName );
            this.setState( {watched: userRes.data.watched, wanted: userRes.data.wanted });
            }
            catch (err)
            {
            console.log( err.message );
            }
        }

    handleOnSearch = (event) => {
        this.setState ({ isOpen: true })
    };

    handleOnClose = (event) => {
        this.setState ({ isOpen: false })
    };

    handleOnSign = (event) => {
        this.setState ({ isSignUp: true })
    };

    handleOnLogIn = (event) => {
        this.setState ({ isSignUp: false})
    };

    handleOnShowLog = (event) => {
        this.setState ({ isLog: true })
        
    };
    
    handleOnHideLog = (event) => {
        this.setState ({ isLog: false })
    };
    
    handleOnUserLoggedIn = (userName) => {
        this.props.onLogin(userName);
        this.setState ({ isLog: false })
        this.forceUpdate();
        
    };

    handleOnWatched = async (movieId) => {
        var isWatched = ( this.state.watched.indexOf( movieId ) != -1 );
        if ( isWatched )
        {
          await API.clear( this.props.userName, movieId );
        } else {
          await API.addWatched( this.props.userName, movieId );
        }
        this.getUserData();
    };

    handleOnWanted = async (movieId) => {
        var isWanted = ( this.state.wanted.indexOf( movieId ) != -1 ); 
        if ( isWanted )
        {
          await API.clear( this.props.userName, movieId );
        } else {
          await API.addWanted( this.props.userName, movieId );
        }
        this.getUserData();
    };
    

  render() {

    var {userName, isLoggedIn} = this.props;

    console.log(isLoggedIn);

    return (
        <React.Fragment>
            <Header 
                onSearch={this.handleOnSearch}
                onShowLog={this.handleOnShowLog}
                isLoggedIn={this.props.isLoggedIn}
                userName={this.props.userName}
                isLog={this.state.isLog}
            />
            <Search 
                isOpen={this.state.isOpen} 
                onClose={this.handleOnClose}
            />
            <ResultContainer
                movies={this.state.movies}
                isSearching={this.state.isSearching}
            />
            <Loginbox 
                handleOnLogIn={this.handleOnLogIn} 
                handleOnShowLog={this.handleOnShowLog}
                handleOnHideLog={this.handleOnHideLog}
                handleOnSign={this.handleOnSign}
                isSignUp={this.state.isSignUp}
                isLog={this.state.isLog}
                onUserLoggedIn={this.handleOnUserLoggedIn}   
            />
        </React.Fragment>
        
    );
  };
}

export default Landing;

