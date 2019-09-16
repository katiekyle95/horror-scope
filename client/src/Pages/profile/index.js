import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import ProfilePage from "../../Components/profilepage";
import API from "../../Utils/API";
import "./style.css";

class Profile extends Component {

    state = {
        isOpen: false,
        isSearching: false,
        watchedIds: [],
        wantedIds: [],
        watchedMovies: [],
        wantedMovies: [],
        dataRetrieved: false,
    };

    componentDidMount() {
    }

    async getData() {
      try {
        this.updateCount = 0;
        var userRes = await API.getUser( this.props.userName );
        this.setState( {dataRetrieved: true, watchedIds: userRes.data.watched, wantedIds: userRes.data.wanted} );
      }
      catch (err)
      {
        console.log( err.message );
      }

      var updateCount = 0;
      while (updateCount < this.state.watchedIds.length )
      {
        var watchedRes = await API.movieDetails( this.state.watchedIds[updateCount] );
        var movie = watchedRes.data;
        var movieData = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }
        var movieList = [...this.state.watchedMovies];
        movieList.push( movieData );
        this.setState( { watchedMovies: movieList  } );
        updateCount++;
      }

      updateCount = 0;
      while (updateCount < this.state.wantedIds.length )
      {
        var wantedRes = await API.movieDetails( this.state.wantedIds[updateCount] );
        var movie = wantedRes.data;
        var movieData = {
          id: movie.id,
          title: movie.title,
          poster_path: movie.poster_path,
        }
        var movieList = [...this.state.wantedMovies];
        movieList.push( movieData );
        this.setState( { wantedMovies: movieList  } );
        updateCount++;
      }
    };

    handleOnSearch = (event) => {
        this.setState ({ isOpen: true })
    };
    
    handleOnClose = (event) => {
        this.setState ({ isOpen: false })
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

        if ( isLoggedIn && this.state.dataRetrieved == false )
        {
          this.getData();
        }

        return (
            <React.Fragment>
                <Header
                    onSearch={this.handleOnSearch}
                    onShowLog={this.handleOnShowLog}
                    isLoggedIn={this.props.isLoggedIn}
                    userName={this.props.userName}
                />
                <Search
                  isOpen={this.state.isOpen}
                  onClose={this.handleOnClose}
                />
                <ProfilePage
                    userName={this.props.userName}
                    watched={this.state.watchedMovies}
                    wanted={this.state.wantedMovies}
                />
                <div className="footer">
                    <p>&copy; 2019</p>
                </div>
            </React.Fragment>
        )
    }
}

export default Profile;