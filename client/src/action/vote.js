import {VOTE} from './constants'
import axios from 'axios'
import store  from '../store'




export const VoteAction = (id, maleVote, femaleVote) => {

store.dispatch((dispatch) => {
    
    const vote_data = { maleVote: maleVote, femaleVote: femaleVote, id: id }
    var request = new Request('/api/issues/voted/' + id, {
        method: "PUT",
        headers: new Headers({ 'Content-Type': 'application/json' }),
        body: JSON.stringify(vote_data)
    });

		dispatch({type:"JUSTVOTED"})
      	fetch(request)
      	.then(()=> 	axios.get('/api/issues'))

        .then((res) => {
            //magically turn from object to JSON 
            return res.data
        })
        .then((data) => {
            //magically returns correct data

            dispatch({ type: "FETCH_SUCCESS", payload: data })
        })
        .catch((err) => {
            return console.log("ERROR AT STORE DISPATCH")
        })
})


    const action = {
        type: VOTE
    }
    return action
}

