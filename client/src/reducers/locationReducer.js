
const initialState = {
    "location": "Duel"
}

const goingToDuel = (state = initialState) => {
    return {...state, "location": "Duel" }
}

const goingToSubmit = (state = initialState) => {
    return {...state, "location": "Submit" }
}

const goingToLanding = (state = initialState) => {
    return {...state, "location": "Landing" }
}

const goingToLogIn = (state = initialState) => {
    return {...state, "location": "LogIn" }
}

const locationReducer = (state = initialState, action) => {

    var newstate = {}
    switch (action.type) {
        case "DUEL":
        console.log("WE INSDIE TRACE")
            newstate = goingToDuel(state)
            console.log("going to Duel")
            return newstate
        case "SUBMIT":
            newstate = goingToSubmit(state)

            console.log("going to Submit")
            return newstate
        case "LANDING":
            newstate = goingToLanding(state)
  
            console.log("going to Landing")
            return newstate

      case "LOGIN":
            newstate = goingToLogIn(state)
            console.log("going to Log In")
            return newstate

        default:
            return state

    }
}

export default locationReducer
