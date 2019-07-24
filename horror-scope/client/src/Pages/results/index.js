import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import ResultCard from "../../Components/result-cards";
import API from "../../Utils/API";
import "./style.css";
import { List, ListItem } from "../../Components/List";
import Loading from "./loading.gif";

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
    };

    handleOnSearch = (event) => {
        this.setState ({ isOpen: true })
    };

    handleOnClose = (event) => {
        this.setState ({ isOpen: false })
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
    }

  render() {

    return (
        <React.Fragment>
            <Header 
                onSearch={this.handleOnSearch}
                />
            <Search 
                isOpen={this.state.isOpen} 
                onClose={this.handleOnClose}
                />
            <ResultContainer 
                movies={this.state.movies}
                isSearching={this.state.isSearching}
                searchName={this.state.searchName}
                />
        </React.Fragment>
    );
  };
}

export default Results;

