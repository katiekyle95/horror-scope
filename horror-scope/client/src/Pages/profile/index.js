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
        movies: [],
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

        return (
            <React.Fragment>
                <Header
                    onSearch={this.handleOnSearch}
                    onShowLog={this.handleOnShowLog}
                    isLoggedIn={this.props.isLoggedIn}
                    userName={this.props.userName}
                />
                <ProfilePage
                    userName={this.props.userName}
                />
            </React.Fragment>
        )
    }
}

export default Profile;