import React from 'react';
import Headerimg from "./horrorscopeheader.png";
import Headermobile from "./logolong brightest.png";
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
            <div className="mobile-nav">
              <h1>Beeev</h1>
            </div>
          ) : (
            <div className="desktop-nav">
                <div className="landing-header">
                     <a href="/"><img className="landing-logo" src={Headerimg} /></a>
                     <div className="social">
                         <a href="#"><i className="fab fa-twitter"></i></a>
                         <a href="#"><i className="fab fa-instagram"></i></a>
                         <a href="#"><i className="fab fa-facebook"></i></a>
                     </div>
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


        // <React.Fragment>
        //     <Nav/>
        //     <div className="comp-browser">
        //         <div className="landing-header">
        //             <a href="/"><img className="landing-logo" src={Headerimg} /></a>
        //             <div className="social">
        //                 <a href="#"><i className="fab fa-twitter"></i></a>
        //                 <a href="#"><i className="fab fa-instagram"></i></a>
        //                 <a href="#"><i className="fab fa-facebook"></i></a>
        //             </div>
        //             <br></br>       
        //         </div>
        //         <div className="nav-space">
        //             <LogIn />
        //             <button type="button" onClick={props.onSearch} className="nav-button">SEARCH</button>
        //         </div>
        //     </div>
            


                

        // </React.Fragment>
    );
}

export default Header;