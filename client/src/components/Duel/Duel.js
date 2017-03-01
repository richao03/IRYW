import React, { Component } from 'react';
import './Duel.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {VoteAction} from '../../action/vote';

class Duel extends Component {


    render() {
        let issuesList = this.props.issues;
        console.log("this is line 13 in duel ", this.props)

        if(this.props.issues){
          var theList = issuesList.map(issue=>
          <div className="question" key={issue.headline}>
          Question: {issue.headline} <br/> 
          <div className="maleVote">{issue.male_vote}</div>
          <div className="wrapper">
          <div className="mainMale" onClick={()=>this.props.VoteAction(issue.id, 1, 0)} >
          Main Points: {issue.male_main}<br/>
          Supporting Details: {issue.male_details}<br/>
          </div>
          </div>
          {this.props.voted}
          <div className="wrapper">
          <div className="mainFemale" onClick={()=>this.props.VoteAction(issue.id, 0, 1)}>
          main from female: {issue.female_main}<br/>
          detail from female: {issue.female_details}
          </div>
          </div>
           <div className="femaleVote">{issue.female_vote}</div>
          </div>
          )
        
        }
        return (
            <div className="Duel">
      {theList}
              
    
      </div>
        );
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({VoteAction}, dispatch)
}

function mapStateToProps(state) {
    return {
        issues:state.basicReducer.issues
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Duel)
