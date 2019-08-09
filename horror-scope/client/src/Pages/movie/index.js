import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import API from "../../Utils/API";
import "./style.css";
import MoviePage from "../../Components/moviepage";
import Loginbox from "../../Components/LogInForms";



class Movies extends Component {

    state = {
        isOpen: false,
        movie: {},
        isSearching: false,
        isLog: false,
        isSignUp: false,
        watched: false,
        wanted: false,
    };

    componentDidMount() {

        this.setState({isSearching: true});
        var movieId = this.props.match.params.movieId;
        this.getData( movieId );

    }

    async getData( movieId )
    {
        var res = await API.movieDetails(movieId);
        var movie = res.data;
        this.setState({ movie: movie, isSearching: false });
        var userRes = await API.getUser( this.props.userName );
        var watched = ( userRes.data.watched.indexOf( movie.id ) != -1 );
        var wanted = ( userRes.data.wanted.indexOf( movie.id ) != -1 );
        this.setState( {watched: watched, wanted: wanted });
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
        
        
    };

    handleUpdateReview = async (qual, ent, scare) => {
        var {movie} = this.state;
        movie.userQ = qual;
        movie.userE = ent;
        movie.userS = scare;
        var movieId = movie.id;
        var userName = this.props.userName;
        await API.movieAddReview( userName, movieId, qual, ent, scare, "" );
        var res = await API.movieDetails(movieId);
        this.setState({ movie: res.data });
    }

    handleWatched = () => {
        if (this.state.watched)
        {
            this.setState( { watched: false } );
            API.clear( this.props.userName, this.state.movie.id );
        } else {
            this.setState( { watched: true, wanted: false } );
            API.addWatched( this.props.userName, this.state.movie.id );
        }
    }

    handleWanted = () => {
        if (this.state.wanted)
        {
            this.setState( { wanted: false } );
            API.clear( this.props.userName, this.state.movie.id );
        } else {
            this.setState( { wanted: true, watched: false } );
            API.addWanted( this.props.userName, this.state.movie.id );
        }
    }


  render() {
      
    var {movie} = this.state;
    var {userName, isLoggedIn} = this.props;

    if ( movie.revies != undefined )
    {
        var { reviews } = movie;
        var userQ = 1;
        var userE = 1;
        var userS = 1;
        for ( var i = 0; i < reviews.length; i++ )
        {
            if ( reviews[i].userName == userName )
            {
                userQ = reviews[i].quality;
                userE = reviews[i].entertainment;
                userS = reviews[i].scariness;
            }
        }
        movie.userQ = userQ;
        movie.userE = userE;
        movie.userS = userS;
    }

    return (
        <React.Fragment>
            <Header 
                onSearch={this.handleOnSearch}
                onShowLog={this.handleOnShowLog}
                isLoggedIn={this.props.isLoggedIn}
                userName={this.props.userName}
                isLog={this.state.isLog}
            />
            <Search isOpen={this.state.isOpen} onClose={this.handleOnClose}/>
            <MoviePage
                movie={movie}
                isSearching={this.state.isSearching}
                isLoggedIn={this.props.isLoggedIn}
                onUpdateReview={this.handleUpdateReview}
                onWatched={this.handleWatched}
                onWanted={this.handleWanted}
                isWatched={this.state.watched}
                isWanted={this.state.wanted}
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

export default Movies;