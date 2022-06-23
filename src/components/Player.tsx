import { Fragment } from "react";
import './Player.css'


const Player = ({ landscape, square, portrait }) => {
    return (
        <Fragment>
            <div className="player-card">
                <div className="player"><video
                    controls
                    autoPlay
                    width="100%"
                    height="100%"
                    src={landscape}>
                </video>

                    <a href={landscape} download="sample">
                        <button
                            className='download-btn'
                            type="button">Download</button>
                    </a>
                </div>

                <div className="player">
                    <video
                        controls
                        autoPlay
                        width="100%"
                        height="100%"
                        src={square}>
                    </video>

                    <a href={square} download="sample">
                        <button className='download-btn'
                            type="button">Download</button>
                    </a>

                </div>

                <div className="player">
                    <video
                        controls
                        autoPlay
                        width="100%"
                        height="100%"
                        src={portrait}>
                    </video>

                    <a href={portrait} download="sample">
                        <button
                            className='download-btn' type="button">Download</button>
                    </a>
                </div>

            </div>



        </Fragment >
    )
}

export default Player;