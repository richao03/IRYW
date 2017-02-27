import React, { Component } from 'react';
import {Router, Route} from 'react-router';
import './App.css';
import Duel from '../Duel/Duel.js';
import Landing from '../Landing/Landing.js'
import Submit from '../Submit/Submit.js'

class App extends Component {

  constructor(){
    super();
    this.state={position:""}
  }


  render() {
 
  var place;
    switch(this.state.position){
      case 'Duel': place = <Duel/>; break;
      case 'Submit': place = <Submit/>; break;
      default: place = <Landing/>
    } 

    return (
      <div className="App">
        <h1>hello</h1>
        <button onClick={()=>this.setState({position:"Duel"})}>Duel</button>
        <button onClick={()=>this.setState({position:"Landing"})}>Landing</button>
        <button onClick={()=>this.setState({position:"Submit"})}>Submit</button>
         {place}     
      </div>
    );
  }
}

export default App;
