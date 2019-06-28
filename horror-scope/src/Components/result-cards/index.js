import React, { Component } from 'react';
import "./style.css";

class ResultCard extends Component {
   
    render() {
        
        var {id, title, overview, release_date, poster_path} =  this.props.movie;
        var year = release_date.substring(0,4);
        var posterImg = 'http://image.tmdb.org/t/p/w185' + poster_path;
        
        return (
        
        <div className="card">
            <img className="result=poster" src={posterImg}></img>
            <div className="card-text">
                <div className="card-title">
                    <a href="#">
                        <span className="movie-name">{title}</span>
                    </a>
                    <h2>(<span className="movie-year">{year}</span>)</h2>
                </div>
            </div>
        </div>
        )
        
    }
}

export default ResultCard;
