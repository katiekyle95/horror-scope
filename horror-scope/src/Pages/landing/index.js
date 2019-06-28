import React, { Component } from 'react';

import Header from "../../Components/header";
import Search from "../../Components/search";
import "./style.css";


class Landing extends Component {

    state = {
        isOpen: false,
    };

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
        </React.Fragment>
    );
  };
}

export default Landing;

