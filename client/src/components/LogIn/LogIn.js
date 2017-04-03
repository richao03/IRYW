import React, { Component } from 'react';
import './LogIn.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {LogInAction, RegisterAction} from '../../action/LogIn';
class LogIn extends Component {

    render() {

        return (
            <div className="LogIn">
      
  
<h1> welcome to log in </h1>
<form method="post" action="/users/login">
<label>User Name</label>
<input type="text" ref="username" placeholder="User Name"/>
<label>Email Address</label>
<input type="text" ref="email" placeholder="Email Address"/>
<label>Password</label>
<input type="password" ref="password" placeholder="Password"/>
    </form>
    <button type="submit" onClick={()=>{this.props.RegisterAction(this.refs.username.value,this.refs.password.value,this.refs.email.value)}}> register </button>
      <button type = "submit" onClick = {()=>{this.props.LogInAction(this.refs.username.value,this.refs.password.value,this.refs.email.value)}}>log in </button>
      </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({LogInAction, RegisterAction}, dispatch)
}

function mapStateToProps(state) {
    return {
        issues:state.basicReducer.issues
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn)

