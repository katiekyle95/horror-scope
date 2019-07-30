import React, { Component } from "react";
import "./style.css";
import RecCard from "../reccards";

class ProfilePage extends Component {

    handleMovieClicked = ( movieId ) => {
        window.location = '/movie/' + movieId;
    };

    render() {

        var {watched, wanted, userName} = this.props;
        

        return (
            <React.Fragment>
                <div className="all">
                    <h1 id="prof-title">{userName}'s HORROR SCOPE</h1>
                    <div className="rate-this-movie">
                        <h2 id="rate-this">Watched</h2>
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }

}
export default ProfilePage;
