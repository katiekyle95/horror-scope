import React, { Component } from "react";
import "./style.css";
import API from "./../../Utils/API";
import X from "./../search/close.png";


function ToSign(props) {
    return (
        <button type="button" onClick={props.onClick} className="logbutton">Sign Up</button> 
    )
}

function ToLog(props) {
    return (
        <button type="button" onClick={props.onClick} className="logbutton">Log In</button>
    )
}

function ToHide(props) {
    return (
        <button className="closelog" onClick={props.onClick}><img src={X}></img></button> 
    )
}

class Loginbox extends Component {

    state = {
        userName: "",
        password: "",
        loginError: "",
      };

      onUserNameChanged = (event) =>
      {
        this.setState ({ 
            userName: event.target.value,
            loginError: "",
        });
      }
      onPasswordChanged = (event) =>
      {
        this.setState ({ 
            password: event.target.value,
            loginError: "",
        });
      }

      toSignUp = (event) =>
      {
        var init = {
            userName: "",
            password: "",
            loginError: "",
          };
        this.setState( init );
        this.props.handleOnSign();
      }
      
      toLogin = (event) =>
      {
        var init = {
            userName: "",
            password: "",
            loginError: "",
          };
        this.setState( init );
        this.props.handleOnLogIn();
      }
      onLogin = (event) =>
      {
        this.setState ({loginError: ""});
        var { userName, password } = this.state;

        API.login( userName, password )
        .then( (res) =>{
            this.props.onUserLoggedIn( res.data.userName );
        })
        .catch ( (err) => {
            this.setState ({loginError: err.response.data});
        });
      }
      onSignUp = (event) =>
      {
        this.setState ({loginError: ""});
        
        var { userName, password } = this.state;

        API.signUp( userName, password )
        .then( (res) =>{
            this.props.onUserLoggedIn( res.data.userName );
        })
        .catch ( (err) => {
            this.setState ({loginError: err.response.data});
        });
      }


render () {
        let status = "";
        let login = (
            <div className="log-container">
                <div className="box">
                    <ToHide onClick={this.props.handleOnHideLog}/>
                    <br></br>
                    
                <div className="formbox">
                    <h2>Log In</h2>
                    <h4>Username *</h4>
                    <input type="text" className="username" name="username" value={this.state.userName} onChange={this.onUserNameChanged}></input>
                    <br></br>
                    <h4>Password *</h4>
                    <input type="password" className="username" name="password" value={this.state.password} onChange={this.onPasswordChanged}></input>
                    <br></br>
                    <div className="invalid">{this.state.loginError}</div>
                    <button className="logingo" onClick={this.onLogin}><span>Log In</span></button>
                    <hr></hr>
                    <h5>New to Horror Scope?</h5>
                    <ToSign onClick={this.toSignUp} />
                 </div>
                </div>
            </div>
            
        );
        let signup = (
            <div className="log-container">
                <div className="box">
                    <ToHide onClick={this.props.handleOnHideLog}/>
                    
                    
                    <div className="formbox">
                    <h2>Sign Up</h2>
                    <h4>Username *</h4>
                    <input type="text" className="username" name="username" value={this.state.userName} onChange={this.onUserNameChanged}></input>
                    <br></br>
                    <h4>Password *</h4>
                    <input type="password" className="username" name="password" value={this.state.password} onChange={this.onPasswordChanged}></input>
                    <br></br>
                    <button className="logingo"onClick={this.onSignUp}><span>Sign Up</span></button>
                        <hr></hr>
                        <h5>Already a member?</h5>
                        <ToLog onClick={this.toLogin} />
                    </div>
                </div>
            </div>
            
        );

        
        if (! this.props.isLog) {
            status = null;
        } else if (this.props.isLog && !this.props.isSignUp) {
            status = login;
        } else if (this.props.isLog && this.props.isSignUp) {
            status = signup;
        }
        return (
            <div>
                {status}
            </div>
        )

        if (! this.props.isSignUp) {
            status = login;
        } else {
            status = signup;
        }
        return (
            <div>
                {status}
            </div>
        )

        
 
      
    
  }
}


  export default Loginbox;