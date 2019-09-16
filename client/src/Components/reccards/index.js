import React, { Component } from "react";
import "./style.css";

class RecCard extends Component {

    handleMovieClicked = () => {
        var {id} = this.props.movie;
        window.location = '/movie/' + id;
    };

    render() {
        var {title,poster_path} = this.props.movie;
        var posterImg = 'http://image.tmdb.org/t/p/w185' + poster_path;
        return ( 
                <div className="rec">
                    <div className="card-space"> 
                        <a onClick={this.handleMovieClicked}>  
                            <img className="rec-poster" src={ posterImg }></img>
                            <br></br>
                            <span className="rec-name">{title}</span>
                        </a>
                    </div>
                </div>
               
            
        );
    }
}

export default RecCard;