import { createStore, applyMiddleware } from 'redux';
import rootReducer from "./reducers/index"
import logger from 'redux-logger'
import thunk from 'redux-thunk'
import axios from 'axios'




const store = createStore(rootReducer, applyMiddleware(logger(), thunk))

store.dispatch((dispatch) => {
    dispatch({ type: "FETCH_REQUEST" })
    axios.get('/api/issues')
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

// const store = createStore(reducer)
//combineReducers({reducer, goToReducer})
export default store
