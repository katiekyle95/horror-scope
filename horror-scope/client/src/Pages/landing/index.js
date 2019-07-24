import React, { Component } from 'react';
import Header from "../../Components/header";
import Search from "../../Components/search";
import "./style.css";
import Loading from "./../results/loading.gif";
import { List, ListItem } from "../../Components/List";
import ResultCard from "./../../Components/result-cards";
import API from "./../../Utils/API";

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

    handleOnSearch = (event) => {
        this.setState ({ isOpen: true })
    };

    handleOnClose = (event) => {
        this.setState ({ isOpen: false })
    };



  render() {

    return (
        <React.Fragment>
            <Header onSearch={this.handleOnSearch}/>
            <Search isOpen={this.state.isOpen} onClose={this.handleOnClose}/>
        <ResultContainer
            movies={this.state.movies}
            isSearching={this.state.isSearching}
        />
        </React.Fragment>
        
    );
  };
}

export default Landing;

