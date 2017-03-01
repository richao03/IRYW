import {FINISHADDISSUE} from './constants';
import axios from 'axios';
import store  from '../store';

export const AddIssue = (headline, male_details, female_details,male_main,female_main) => {

store.dispatch((dispatch) => {

    const issue_data= {
      headline:headline,
      male_details:male_details,
      female_details:female_details,
      male_main:male_main,
      female_main:female_main
    };
    console.log("THIS IS ISSUE DATA",issue_data)
    var request = new Request ('/api/issue', {
      method:"POST",
      headers: new Headers({ 'Content-Type':'Application/json'}),
      body: JSON.stringify(issue_data)
    });


		dispatch({type:"ADDISSUE"})
      	fetch(request)
      	// .then(()=> 	axios.get('/api/issues'))

       //  .then((res) => {
       //      //magically turn from object to JSON 
       //      return res.data
       //  })
       //  .then((data) => {
       //      //magically returns correct data

       //      dispatch({ type: "FETCH_SUCCESS", payload: data })
       //  })
       //  .catch((err) => {
       //      return console.log("ERROR AT STORE DISPATCH")
       //  })
})



    const action = {
        type: FINISHADDISSUE
    }
    return action
}

