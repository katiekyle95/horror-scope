import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import ResultCard from "../../Components/result-cards";
import API from "../../Utils/API";
import "./style.css";
import { List, ListItem } from "../../Components/List";
import MoviePage from "../../Components/moviepage";
import Loginbox from "../../Components/LogInForms";

class Movies extends Component {

    state = {
        isOpen: false,
        movie: {},
        isSearching: false,
        isLog: false,
        isSignUp: false,
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
        this.setState({ movie: movie, isSearching: false })
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


  render() {
      
    var {movie} = this.state;
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
            <Search isOpen={this.state.isOpen} onClose={this.handleOnClose}/>
            <MoviePage
                movie={movie}
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

export default Movies;