import React from 'react';

const userOutput = (props) => {
    return (
        <div className="userOutput">
        <p style={props.style}>{props.username}</p>
        <p>Another paragraph</p>
        </div>
    )
}


export default userOutput;