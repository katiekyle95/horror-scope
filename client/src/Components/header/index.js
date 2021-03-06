import React from 'react';
import Headerimg from "./horrorscopeheader.png";
import Headermobile from "./horrorscopeheadermobile.png";
import "./style.css";

function DropButton() {
    return (
        <button type="button" className="nav-button"><i class="fas fa-bars"></i></button>
    )
}

function isMobile()
{
  var w = Math.max(document.documentElement.clientWidth,
    window.innerWidth || 0);  
    if ( w <= 600 ) {
      return true;
    };

    return false;
}



function Header(props) {
    
    var user = props.userName;

    return (
        <div className="nav">
          {isMobile() ? (
            <React.Fragment>
            <div className="mobile-nav">
                <a href="/"><img className="mobile-logo" src={Headermobile} /></a>
            </div>
            <div>
            {props.isLoggedIn ? (
                <div className="nav-space">
                    <a href="/profile" className="nav-button">Hello, {user}</a>
                    <button type="button" onClick={props.onSearch} className="nav-button">SEARCH</button>
                </div>
                ) : (
                <div className="nav-space">
                    <button type="button" onClick={props.onShowLog} className="nav-button">LOG IN</button>
                    <button type="button" onClick={props.onSearch} className="nav-button">SEARCH</button>
                </div> 
                )
            }
            </div>
            </React.Fragment>
            
          ) : (
            <div className="desktop-nav">
                <div className="landing-header">
                     <a href="/"><img className="landing-logo" src={Headerimg} /></a>

                     <br></br>       
                </div>
                <div>
                {props.isLoggedIn ? (
                    <div className="nav-space">
                        <a href="/profile" className="nav-button">Hello, {user}</a>
                        <button type="button" onClick={props.onSearch} className="nav-button">SEARCH</button>
                    </div>
                    ) : (
                    <div className="nav-space">
                        <button type="button" onClick={props.onShowLog} className="nav-button">LOG IN</button>
                        <button type="button" onClick={props.onSearch} className="nav-button">SEARCH</button>
                    </div> 
                    )
                }
                </div>
            </div>
          )}
        </div>


  
    );
}

export default Header;