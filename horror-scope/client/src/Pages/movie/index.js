import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import ResultCard from "../../Components/result-cards";
import API from "../../Utils/API";
import "./style.css";
import { List, ListItem } from "../../Components/List";
import MoviePage from "../../Components/moviepage";

class Movies extends Component {

    state = {
        isOpen: false,
        movie: {},
        isSearching: false,
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

    handleOnSearch = (event) => {
        this.setState ({ isOpen: true })
    };

    handleOnClose = (event) => {
        this.setState ({ isOpen: false })
    };



  render() {
      var {movie} = this.state;

    return (
        <React.Fragment>
            <Header onSearch={this.handleOnSearch}/>
            <Search isOpen={this.state.isOpen} onClose={this.handleOnClose}/>
            <MoviePage
                movie={movie}
                isSearching={this.state.isSearching}
            />
        </React.Fragment>
    );
  };
}

export default Movies;