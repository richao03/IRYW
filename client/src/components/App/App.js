import React, { Component } from 'react';
import './App.css';
import Duel from '../Duel/Duel.js';

class App extends Component {

  constructor(){
    super();
    this.state={issues:[]}
  }

//AJAX GOES HERE 
  componentDidMount(){
    fetch('/api/issues')
    .then((res)=>{

//magically turn from object to JSON 
      console.log("line 16", res)
      return res.json()
    })
    .then((data)=>{
      //magically returns correct data
     this.setState({issues:this.state.issues.concat(data)})
    })
  }

  addIssue(event){
    event.preventDefault();
    let issue_data= {
      headline: this.refs.headline.value,
      male_details: this.refs.male_details.value,
      female_details: this.refs.female_details.value,
      male_main:this.refs.male_main.value,
      female_main:this.refs.female_main.value
    };

    var request = new Request ('/api/issue', {
      method:"POST",
      headers: new Headers({ 'Content-Type':'application/json'}),
      body: JSON.stringify(issue_data)
    });

    fetch(request)
    .then((res)=>{
      console.log("line 33", res.body)
      res.json()
    })
    .then((data)=>{
      let issues = this.state.issues
      issues.push(issue_data)
      console.log("this is line 39 state", issue_data)
      this.setState({
        issues : issues
      }) 
    })


  }

  render() {
    let issuesList = this.state.issues
    console.log("this is line 50 ", this.state)
    return (
      <div className="App">
        <h1>hello</h1>

        <form>
          <input type="text" ref="headline" placeholder=" headline " />
          <input type="text" ref="male_main" placeholder=" male main " />
          <input type="text" ref="male_details" placeholder=" male details " />
           <input type="text" ref="female_main" placeholder=" female main " />
            <input type="text" ref="female_details" placeholder=" female details " />
          <button onClick={this.addIssue.bind(this)}>ADD ISSUE </button>
             </form>
         <Duel issues = {this.state.issues}></Duel>
     
      </div>
    );
  }
}

export default App;
