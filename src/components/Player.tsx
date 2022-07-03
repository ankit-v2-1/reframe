import { Fragment } from "react";
import './Player.css'


const Player = ({ output }) => {
    return (

        <Fragment>
            <div className="player-card">
                <div className="player"><video
                    controls
                    autoPlay
                    width="100%"
                    height="100%"
                    src={output}>
                </video>

                    <a href={output} download="sample">
                        <button
                            className='download-btn'
                            type="button">Download</button>
                    </a>
                </div>
            </div>
        </Fragment >
    )
}

export default Player;