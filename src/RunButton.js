import React from 'react';


function RunButton(props) {
    return (
        <div>
            <button onClick={props.onRunClick}>Run</button>
        </div>
    )
}

export default RunButton;