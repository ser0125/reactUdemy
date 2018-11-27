import React from 'react'; 
import './UserInput.css';

const userInput = (props) => {
return (
    <div className="userInput">
    <input onChange={props.change} value={props.value}/>
    </div>
    )
}


export default userInput