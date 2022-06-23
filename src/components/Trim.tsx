import { Fragment } from "react";
import { fetchFile } from '@ffmpeg/ffmpeg';
import './Trim.css'


const Trim = ({ ffmpeg, start, end, setTrimedVideo, setStart, setEnd, video, setProgress }) => {

    const trimVideo = async () => {
        ffmpeg.FS('writeFile', 'input', await fetchFile(video));
        ffmpeg.setProgress(({ ratio }) => {
            setProgress(Math.round((ratio + Number.EPSILON) * 100) / 100);
            console.log(ratio);
        });

        await ffmpeg.run('-i', 'input', '-ss', start, '-to', end, 'output.mp4');
        const Data = ffmpeg.FS('readFile', 'output.mp4');
        setTrimedVideo(URL.createObjectURL(new Blob([Data.buffer], { type: 'video/mp4' })));
    }

    const updateStart = (e) => {
        setStart(e.target.value);
    }

    const updateEnd = (e) => {
        setEnd(e.target.value);
    }


    return (
        <Fragment>
            <div className="trim-tool">
                <input type="text" placeholder='00:00:00' onChange={updateStart} />
                <input type="text" placeholder='00:00:00' onChange={updateEnd} />
                <button onClick={trimVideo}>Trim</button>
            </div>

        </Fragment>
    )
}

export default Trim;