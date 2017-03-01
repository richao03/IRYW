import React, { Component } from 'react';
import './Submit.css';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {AddIssue} from '../../action/submit';
class Submit extends Component {


  // addIssue(event){
  //   event.preventDefault();
  //   let issue_data= {
  //     headline: this.refs.headline.value,
  //     male_details: this.refs.male_details.value,
  //     female_details: this.refs.female_details.value,
  //     male_main:this.refs.male_main.value,
  //     female_main:this.refs.female_main.value
  //   };

  //   var request = new Request ('/api/issue', {
  //     method:"POST",
  //     headers: new Headers({ 'Content-Type':'Application/json'}),
  //     body: JSON.stringify(issue_data)
  //   });

  //   fetch(request)
  //   .then((res)=>{
  //     console.log("line 33", res.body)
  //     res.json()
  //   })
  //   .then((data)=>{
  //     let issues = this.state.issues
  //     issues.push(issue_data)
  //     console.log("this is line 39 state", issue_data)
  //     this.setState({
  //       issues : issues
  //     }) 
  //   })


  // }

  render() {

    return (
      <div className="Submit">
        <h1>This is where we submit our personal issues for the world to see</h1>
        <form>
          <input type="text" ref="headline" placeholder=" headline " />
          <input type="text" ref="male_main" placeholder=" male main " />
          <input type="text" ref="male_details" placeholder=" male details " />
           <input type="text" ref="female_main" placeholder=" female main " />
            <input type="text" ref="female_details" placeholder=" female details " />
          <button onClick={()=>{this.props.AddIssue(this.refs.headline.value,this.refs.male_details.value,this.refs.female_details.value,this.refs.male_main.value,this.refs.female_main.value)}}>ADD ISSUE </button>
             </form>
     
      </div>
    );
  }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({AddIssue}, dispatch)
}

function mapStateToProps(state) {
    return {
        issues:state.basicReducer.issues
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Submit)

