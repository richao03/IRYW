import {LOGIN} from './constants';
import store  from '../store';


export const RegisterAction = (username, password, email) => {


store.dispatch((dispatch) => {
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);

    const acct_data= {
   username, hash, email
    };
    console.log("THIS IS ISSUE DATA",acct_data)
    var request = new Request ('/api/users', {
      method:"POST",
      headers: new Headers({ 'Content-Type':'Application/json'}),
      body: JSON.stringify(acct_data)
    });
		dispatch({type:"ADDUSER"})
     	fetch(request)

})



    const action = {
        type: LOGIN
    }
    return action
}

export const LogInAction = (username, password, email) => {

store.dispatch((dispatch) => {
var bcrypt = require('bcryptjs');
var salt = bcrypt.genSaltSync(10);
var hash = bcrypt.hashSync(password, salt);

    const acct_data= {
   username, hash, email
    };
    console.log("THIS IS ISSUE DATA",acct_data)
    var request = new Request ('/api/users', {
      method:"GET",

    });
    dispatch({type:"ADDUSER"})
      fetch(request)

})



    const action = {
        type: LOGIN
    }
    return action
}
