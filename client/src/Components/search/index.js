import React, { Component } from 'react';
import './style.css';
import Closeout from "./close.png";

class Search extends Component {
    
    state = {
        searchName: "",
    };

    onNameChanged = (event) => {
        this.setState ({
            searchName: event.target.value
        });
        
    }

    onSearchButton = () => {
        if ( this.state.searchName.length > 0 ) {
            window.location = '/search/' + this.state.searchName;
        }
    }
    
    render () {
        let modal = (
            <div className="modal-container">
                <button type="button"  onClick={this.props.onClose} className="close-btn" >
                    <img className="close-X"  src={Closeout}></img>
                </button>
                <div className="barbutton">
                    <input
                        className="search"
                        type="text"
                        name="search"
                        value={this.state.searchName}
                        onChange={this.onNameChanged}
                        placeholder="search movie...">
                    </input>
                    <a className="search-go" onClick={this.onSearchButton}>
                        <i className="fas fa-search"></i>
                    </a>
                </div>
                
            </div>
        );

        if (! this.props.isOpen) {
            modal = null;
        }
        return (
            <div>
                {modal}
            </div>
        )
    }
}

export default Search;