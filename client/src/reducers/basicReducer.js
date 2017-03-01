
const initialState = { fetched: false, voted: "no" }

const reducer = (state = initialState, action) => {

    switch (action.type) {
        case "FETCH_REQUEST":
            console.log("FETCH_REQUEST CALLED")
            return state;

        case "FETCH_SUCCESS":
            console.log("SUCCESS REDUCER")
            return {...state, issues: action.payload, fetched: true }


        case "JUSTVOTED":
            console.log("JUST VOTED")
            return state;

        case "VOTE":
            return state
    

        case "ADDISSUE":
               console.log("JUST SUBMITTED")
            return state
         
        case "FINISHADDISSUE":
            console.log("finished adding issue!!")
            return state

        default:
            return state

    }
}

export default reducer
