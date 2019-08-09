import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import ResultCard from "../../Components/result-cards";
import API from "../../Utils/API";
import "./style.css";
import { List, ListItem } from "../../Components/List";
import Loading from "./loading.gif";
import Loginbox from "../../Components/LogInForms";

function ResultContainer(props) {
    
    if ( props.isSearching ) {
        return ( 
            <div className="results-here">
                <h2> Search Results for "<span>{props.searchName}</span>"</h2>
                <div className="loadHere">
                    <img className="spinner" src={Loading}></img>
                </div>
            </div>
        );
    }

    return (
        <div className="results-here">
            <h2 className="search-title"> Search Results for "<span>{props.searchName}</span>"</h2>
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
                            isLoggedIn={props.isLoggedIn}
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

class Results extends Component {

    state = {
        isOpen: false,
        movies: [],
        isSearching: false,
        searchName: "",
        isLog: false,
        isSignUp: false,
        watched: [],
        wanted: [],
    };
    
    async componentDidMount() {
        var searchName = this.props.match.params.name;
        this.setState({ isSearching: true, searchName: searchName,});

        try {
            var res= await API.movieSearch(searchName);
            this.setState({ movies: res.data, isSearching: false })
        }
        catch (err)
        {
            console.log( err.message );
        }

        try {
            var userRes = await API.getUser( this.props.userName );
            this.setState({watched: userRes.data.watched, wanted: userRes.data.wanted })
        }
        catch (err)
        {
            console.log( err.message );
        }
    }; 

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
    
    handleOnWatched = async (movieId) => {
        var isWatched = ( this.state.watched.indexOf( movieId ) != -1 );
        if ( isWatched )
        {
          await API.clear( this.props.userName, movieId );
        } else {
          await API.addWatched( this.props.userName, movieId );
        }
        this.getUserData();
      }

    handleOnWanted = async (movieId) => {
        var isWanted = ( this.state.wanted.indexOf( movieId ) != -1 ); 
        if ( isWanted )
        {
          await API.clear( this.props.userName, movieId );
        } else {
          await API.addWanted( this.props.userName, movieId );
        }
        this.getUserData();
      }    

  render() {

    var {userName, isLoggedIn} = this.props;

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
                searchName={this.state.searchName}
                isLoggedIn={this.props.isLoggedIn}
                watched={this.state.watched}
                wanted={this.state.wanted}
                onWatched={this.handleOnWatched}
                onWanted={this.handleOnWanted}
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

export default Results;

