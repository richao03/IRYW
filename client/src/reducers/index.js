import {combineReducers} from 'redux';
import basicReducer from './basicReducer';
import locationReducer from './locationReducer'



const rootReducer = combineReducers({
	basicReducer, locationReducer
})

export default rootReducer;