import React, { Component } from 'react';
import './App.css';

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {GoToSubmit, GoToDuel, GoToLanding, GoToLogIn} from '../../action/topbar'
import whichToShow from './whichToShow'
//which global state should be used in this component to which local property
const mapStateToProps = (state) => {
    console.log("STATE IN APP ********", state)
    return {
        issues:state.basicReducer.issues,
        location: state.locationReducer.location
    }
}



class App extends Component {




  render() {
    return (
      <div className="App">
        <h1>hello... its me</h1>
        <button onClick={()=>this.props.GoToDuel()}>Duel</button>
        <button onClick={()=>this.props.GoToLanding()}>Landing</button>
        <button onClick={()=>this.props.GoToSubmit()}>Submit</button>
        <button onClick={()=>this.props.GoToLogIn()}>Log In</button>
         {whichToShow(this.props.issues, this.props.location)}     
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({GoToDuel, GoToSubmit, GoToLanding, GoToLogIn}, dispatch)
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
