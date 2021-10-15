import React, { useRef } from 'react';

const Start = ({ setUser }) => {

    const inputRef = useRef();

    const handleClickUser = () => {
        inputRef.current.value && setUser(inputRef.current.value);
    }

    return (
        <div className="start">
            <input placeholder="Enter your name..." className="startInput" ref={inputRef} />
            <button className="startButton" onClick={handleClickUser}>Start</button>
        </div>
    )
}

export default Start
