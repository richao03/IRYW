import { LANDING, DUEL, SUBMIT } from './constants'
// import {bindActionCreators} from 'redux'
// import {connect} from 'react-redux'

export const GoToLanding = () => {
    const action = {
        type: LANDING
    }
    return action
}

export const GoToDuel = () => {
    const action = {
        type: DUEL
    }
    return action
}

export const GoToSubmit = () => {
    const action = {
        type: SUBMIT
    }
    return action
}
