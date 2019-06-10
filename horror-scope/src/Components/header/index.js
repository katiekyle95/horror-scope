import React from 'react';
import Headerimg from "./horrorscopeheader.png";
import Headermobile from "./logolong brightest.png";
import "./style.css";

function LogIn() {
    return (
       <button type="button" className="nav-button">LOG IN</button> 
    )   
};

function DropButton() {
    return (
        <button type="button" className="nav-button"><i class="fas fa-bars"></i></button>
    )
}

function Nav() {
    return (
      <React.Fragment>
        <div className="moblogo">
          <img className="mobile-logo" src={Headermobile}></img>
        </div>
        <div className="menu-wrap">
          <input type="checkbox" className="toggler"></input>
          <div className="hamburger"><div></div></div>
          <div className="menu">
            <div>
              <div className="links"> 
                <button type="button" className="nav-button">SEARCH</button>
                <LogIn />
                <a href="/" className="to-pop-now">POPULAR NOW</a>
                <div className="social">
                  <a href="#"><i className="fab fa-twitter"></i></a>
                  <a href="#"><i className="fab fa-instagram"></i></a>
                  <a href="#"><i className="fab fa-facebook"></i></a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    )
}

function Header() {
    
    return (
        <React.Fragment>
            <Nav/>
            <div className="comp-browser">
                <div className="landing-header">
                    <a href="/"><img className="landing-logo" src={Headerimg} /></a>
                    <div className="social">
                        <a href="#"><i className="fab fa-twitter"></i></a>
                        <a href="#"><i className="fab fa-instagram"></i></a>
                        <a href="#"><i className="fab fa-facebook"></i></a>
                    </div>
                    <br></br>       
                </div>
                <div className="nav-space">
                    <LogIn/>
                    <button type="button" className="nav-button">SEARCH</button>
                </div>
            </div>
            


                

        </React.Fragment>
    );
}

export default Header;