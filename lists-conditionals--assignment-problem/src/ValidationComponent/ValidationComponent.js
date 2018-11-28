import React from 'react';

const validationComponent = (props) => {
    if(props.length>5){
        return (
            <p>Text is too long</p>
            );
    }  
    return (
    <p>Text is too short</p>
            );
}

export default validationComponent;