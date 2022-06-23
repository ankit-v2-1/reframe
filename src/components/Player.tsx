import React from "react";


const Player = (props) => {
    return (
        <div>
            <video
                controls
                width="250"
                src={props.videoSrc}>
            </video>

            <a href={props.videoSrc} download="sample">
                <button type="button">Download</button>
            </a>

        </div>
    )
}

export default Player;