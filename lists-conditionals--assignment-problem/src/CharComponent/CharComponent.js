import React from 'react';

const charComponent = (props) => {
    let style = {
         display: 'inline-block',
         padding: '16px', 
         textAlign: 'center', 
         margin: '16px', 
         border: '1px solid black'
    }
    return (
        <p style={style} onClick={props.click}>{props.char}</p>
    )
}


export default charComponent;