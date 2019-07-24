import React, { Component } from 'react';
import "./style.css";
import Star from "./star.png";
import StarRatingComponent from 'react-star-rating-component';


class ResultCard extends Component {
   
    handleMovieClicked = () => {
        var {id} = this.props.movie;
        window.location = '/movie/' + id;
    };

    onWatched = () => {
        this.props.onWatched( this.props.movie.id );
    };

    onWanted = () => {
        this.props.onWanted( this.props.movie.id );
    };

    render() {
        
        var {id, title, overview, release_date, poster_path} =  this.props.movie;
        var year = release_date.substring(0,4);
        var posterImg = 'http://image.tmdb.org/t/p/w185' + poster_path;
        // var {wanted,watched} = this.props;
        // var isWatched = (watched.indexOf(id) != -1);
        // var isWanted = (wanted.indexOf(id) != -1);
        // var watchedStyle = {opacity: '1'};
        // if ( isWatched )
        // {
        //         watchedStyle = {opacity: '0.5'};
        // }
        // var wantedStyle = {opacity: '1'};
        // if ( isWanted )
        // {
        //         wantedStyle = {opacity: '0.5'};
        // }

        
        return (
        
            
        <div className="card">
            <img className="result-poster" src={posterImg}></img>
            <div className="card-text">
                <div className="card-title">
                    <a onClick={this.handleMovieClicked}>
                        <span className="movie-name">{title}</span>
                    </a>
                    <h2>(<span className="movie-year">{year}</span>)</h2>
                </div>
                <div className="card-ratings">
                    
                    <div className="rating">
                            <h3>Quality:</h3>
                            <h2><img src={Star}></img><span className="quality-average">{this.props.movie.averageQuality}</span></h2>
                        </div>
                        <div className="rating">
                            <h3>Entertainment:</h3>
                            <h2><img src={Star}></img><span className="ent-average">{this.props.movie.averageEntertainment}</span></h2>
                        </div>
                        <div className="rating">
                            <h3>Scariness:</h3>
                            <h2><img src={Star}></img><span className="scariness-average">{this.props.movie.averageScariness}</span></h2>
                        </div> 
                    </div>    
                    
                    
                
                <p><span className="movie-overview">{overview}</span></p>
                <div className="spacer"></div>
                <div className="add-buttons">
                    <button className="add-watched">Watched</button>
                    <button className="add-to-watch">To Watch</button>
                </div>
                
            </div>
        </div>
            
        )
        
    }
}

export default ResultCard;
