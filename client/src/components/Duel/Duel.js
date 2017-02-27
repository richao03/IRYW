import React, { Component } from 'react';
import './Duel.css';

class Duel extends Component {

    constructor(props) {
        super(props);
        this.state = {
          issues:[],
            voted: "no"
        }
        this.vote = this.vote.bind(this);
    }

  componentDidMount(){
    console.log("this is in mount", this)
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

    vote(id, maleVote, femaleVote) {
      console.log("this is in vote", this)
        const vote_data = { maleVote: maleVote, femaleVote: femaleVote, id: id }
        var request = new Request('/api/issues/voted/' + id, {
            method: "PUT",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(vote_data)
        });
        if(this.state.voted == "no"){
        fetch(request)
        // let setVoteToYes={voted:"yes"}
        // let newState = {...this.state, ...setVoteToYes}
        // console.log("new state is here", newState)
        // this.state = newState;
        // console.log("we in line 41!!", this.state)
        this.setState({voted:"yes"})
          } else {
            return 
          }
        
    }



    render() {
        let issuesList = this.state.issues;
        console.log("this is line 30 in duel ", this.state)
        return (
            <div className="Duel">
      
              {issuesList.map(issue=>
          <div className="question" key={issue.headline}>
          Question: {issue.headline} <br/> 
          <div className="maleVote">{issue.male_vote}</div>
          <div className="wrapper">
          <div className="mainMale" onClick={()=>this.vote(issue.id, 1, 0)}>
          Main Points: {issue.male_main}<br/>
          Supporting Details: {issue.male_details}<br/>
          </div>
          </div>
          <div className="wrapper">
          <div className="mainFemale" onClick={()=>this.vote(issue.id, 0, 1)}>
          main from female: {issue.female_main}<br/>
          detail from female: {issue.female_details}
          </div>
          </div>
           <div className="femaleVote">{issue.female_vote}</div>
          </div>
          )}
        
    
      </div>
        );
    }
}

export default Duel;
