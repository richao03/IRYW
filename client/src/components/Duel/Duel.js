import React, { Component } from 'react';
import './Duel.css';

class Duel extends Component {

    constructor() {
        super();
        this.state = {
            voted: "no"
        }
    }


    vote(id, maleVote, femaleVote) {
        const vote_data = { maleVote: maleVote, femaleVote: femaleVote, id: id }
        var request = new Request('/api/issues/voted/' + id, {
            method: "PUT",
            headers: new Headers({ 'Content-Type': 'application/json' }),
            body: JSON.stringify(vote_data)
        });
        if(this.state.voted == "no"){
        fetch(request)
        this.setState({
            voted: "yes"
        })
          } else {
            return 
          }
    }



    render() {
        let issuesList = this.props.issues;
        console.log("this is line 30 in duel ", this.props)
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
