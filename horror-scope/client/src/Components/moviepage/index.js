import React, { Component } from 'react';
import "./style.css";
import Star from './../result-cards/star.png';
import StarRatingComponent from 'react-star-rating-component';
import RecCard from './../reccards';


function StarQual(props) {
    let status = "";

    let rateIsLogged = (
        <div className="rating-label">
            <h3>Quality: </h3>
            <StarRatingComponent
                name="qualityRating"
                starCount={5}
                value={props.starRating}
                onStarClick={props.onStarClick}
                starColor={'#cc3333'}
                emptyStarColor={'#bbb'}
                renderStarIcon={() => <span><i className="fas fa-star"></i></span>}
            />
        </div>
    )
    
    if (! props.isLoggedIn) {
        status = null;
    } else {
        status = rateIsLogged;
    }

    return (
        <div>
            {status}
        </div>    
    )
}

function StarEnt(props) {
    let status = "";

    let rateIsLogged = (
        <div className="rating-label">
            <h3>Entertainment: </h3>
            <StarRatingComponent
                name="entertainmentRating"
                starCount={5}
                value={props.starRating}
                onStarClick={props.onStarClick}
                starColor={'#cc3333'}
                emptyStarColor={'#bbb'}
                renderStarIcon={() => <span><i className="fas fa-star"></i></span>}
            />
        </div>
    )

    if (! props.isLoggedIn) {
        status = null;
    } else {
        status = rateIsLogged;
    }

    return (
        <div>
            {status}
        </div>
    )
}

function StarScare(props) {
    let status = "";

    let rateIsLogged = (
        <div className="rating-label">
            <h3>Scariness: </h3>
            <StarRatingComponent
                name="scareRating"
                starCount={5}
                value={props.starRating}
                onStarClick={props.onStarClick}
                starColor={'#cc3333'}
                emptyStarColor={'#bbb'}
                renderStarIcon={() => <span><i className="fas fa-star"></i></span>}
            />
        </div>
    )

    if (! props.isLoggedIn) {
        status = null;
    } else {
        status = rateIsLogged;
    }

    return (
        <div>
            {status}
        </div>
    )
}

function AddButtons(props) {

    var watchedStyle = {opacity:'1'};
    if ( props.isWatched )
    {
        watchedStyle = {opacity:'0.5'};
    }

    var wantedStyle = {opacity:'1'};
    if ( props.isWanted )
    {
        wantedStyle = {opacity:'0.5'};
    }

    let status = "";

    let addLogged = (
        <div className="add-full-buttons">
            <button className="add-watched" style={watchedStyle} onClick={props.onWatched}>Watched</button>
            <button className="add-to-watch" style={wantedStyle} onClick={props.onWanted}>To Watch</button>
        </div> 
    ) 

    let addNot = (
        <div className="add-full-buttons">
            <h4 id="log-in-to">Log in to rate this movie and add it to your lists.</h4>
        </div>
    )

    if (! props.isLoggedIn) {
        status = addNot;
    } else {
        status = addLogged;
    }
    return (
        <div>
            {status}   
        </div>
            
    )  

}

function ReviewTitle(props) {
     let status = "";

     let titleIsLogged = (
        <React.Fragment>
        <hr id="separator"></hr> 
        <div className="rate-this-movie">
            <h2 id="rate-this">Rate this Movie</h2>
        </div>
        </React.Fragment>
     )

     if (! props.isLoggedIn) {
         status = null;
     } else {
         status = titleIsLogged;
     }

     return (
         <div>
             {status}
         </div>
     )

}

class MoviePage extends Component {

    userQ = 1;
    userE = 1;
    userS = 1;
    
    handleOnStarClick = (nextValue, prevValue, name) => {
        switch( name )
        {
            case 'qualityRating':
            this.userQ = nextValue;
            break;

            case 'entertainmentRating':
            this.userE = nextValue;
            break;

            case 'scareRating':
            this.userS = nextValue;
            break;
        }
        this.updateReview();
    }

    updateReview = () => {
        this.props.onUpdateReview(this.userQ, this.userE, this.userS);
    }

    handleOnWatched = () => {
        this.props.onWatched();
    }

    handleOnWanted = () => {
        this.props.onWanted();
    }

    render() {
        
        var {movie} = this.props;
        if ( movie.title === undefined )
        {
            return (
                <React.Fragment>
                    <div className="all"></div>
                </React.Fragment>
            );
        }

        var {title, overview, release_date, poster_path, runtime, director} = movie;
        var year = release_date.substring(0,4);
        var posterImg = 'http://image.tmdb.org/t/p/w342' + poster_path;
        var {original_language} = movie;

        this.userQ = movie.userQ;
        this.userE = movie.userE;
        this.userS= movie.userS;

        var language;
        switch ( original_language )
        {
            case "en":
                language = "English";
                break;
            case "es":
                language = "Spanish";
                break;
            case "it":
                language = "Italian";
                break;
            case "ko":
                language = "Korean";
                break;
            case "ja":
                language = "Japanese";
                break;
            case "de":
                language = "German";
                break;
            case "fr":
                language = "French";
                break;
            default:
                language = "English";
                break;
        }
        var { recommendations } = movie;
        var { isWatched, isWanted } = this.props;

        return (
            <React.Fragment>
            
                <div className="all">
                    <div className="page">
                        <div className="top-info">
                            <div className="poster">
                                <img className="page-poster" src={posterImg}></img>
                            </div>
                            <div className="movie-text">
                                <div className="movie-title">
                                    <h1>
                                        <span className="movie-name">{title}</span>
                                    </h1>
                                    <h2 id="year">(<span className="movie-year">{year}</span>)</h2>
                                </div>
                                <div className="movie-ratings">
                                    <div className="q-rating">
                                        <h3>Quality:</h3>
                                        <h2><img src={Star}></img><span className="quality-average">{movie.averageQuality}</span></h2>
                                    </div>   
                                    <div className="e-rating"> 
                                        <h3>Entertainment:</h3>
                                        <h2><img src={Star}></img><span className="ent-average">{movie.averageEntertainment}</span></h2>
                                    </div> 
                                    <div className="s-rating">   
                                        <h3>Scariness:</h3>
                                        <h2><img src={Star}></img><span className="scariness-average">{movie.averageScariness}</span></h2>
                                    </div>
                                </div>    
                                <div className="movie-details">
                                    <div className="single-line">
                                        <h3>Runtime: </h3> 
                                        <p><span className="runtime">{runtime+"m"}</span></p>
                                    </div>
                                    <div className="single-line">
                                        <h3>Language: </h3> 
                                        <p><span className="language">{language}</span></p>
                                    </div>
                                    <div className="page-overview">
                                        <h3 className="over-title"> Overview: </h3>
                                        <p className="overview">{overview}</p> 
                                        
                                    </div> 
                                </div>
                            
                            </div> 
                        </div>
                            
                            <AddButtons
                                isLoggedIn = {this.props.isLoggedIn}
                                onWatched={this.handleOnWatched}
                                onWanted={this.handleOnWanted}
                                isWatched={isWatched}
                                isWanted={isWanted}
                            />    
                            <ReviewTitle
                                isLoggedIn = {this.props.isLoggedIn}
                            />
                            <div className="user-rate-content">
                                <StarQual
                                    isLoggedIn = {this.props.isLoggedIn}
                                    starRating={this.userQ}
                                    onStarClick={this.handleOnStarClick} 
                                />
                                <StarEnt
                                    isLoggedIn = {this.props.isLoggedIn} 
                                    starRating={this.userE}
                                    onStarClick={this.handleOnStarClick}
                                />
                                <StarScare
                                    isLoggedIn = {this.props.isLoggedIn} 
                                    starRating={this.userS}
                                    onStarClick={this.handleOnStarClick}
                                />
                            </div>

                        <hr id="separator"></hr>
                        <div className="rate-this-movie">
                                <h2 id="rate-this">Recommended Movies</h2>
                        </div>
                        <div>
                            {recommendations.length ? (
                                <div className="recommended-here">
                                    {recommendations.map(movie => (
                                        <RecCard key={movie.id} movie={movie} />
                                    ))}
                                </div>
                            ) : (
                                <div>No Results Found</div>
                            )}

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }

}

export default MoviePage;