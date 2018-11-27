import React from 'react';

const UserOutput = (props) => {
    return (
        <div className="userOutput">
        <p style={props.style}>{props.username}</p>
        </div>
    )
}


export default UserOutput;