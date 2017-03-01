import React from 'react';
import Duel from '../Duel/Duel.js';
import Landing from '../Landing/Landing.js'
import Submit from '../Submit/Submit.js'


export default function whichToShow(issues, location){
	console.log("inside which to show", issues, location)
    if(location === "Duel"){
       return(
          <Duel issues={issues}/>
        )
    }
    if(location ==="Landing"){
        return(
             <Landing/>
        )
    }
    if(location ==="Submit"){
        return(
            <Submit issues={issues}/>
        )
    }
}