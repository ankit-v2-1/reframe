import { Fragment } from 'react';
import { fetchFile } from '@ffmpeg/ffmpeg';
import './Resize.css'


const Resize = ({ ffmpeg, trimedVideo, style, setStyle, ratio, setRatio, output, setOutput, video, setProgress }) => {

    // function to resize video
    const resizeVideo = async () => {

        if (trimedVideo) { ffmpeg.FS('writeFile', 'input', await fetchFile(trimedVideo)); } else { ffmpeg.FS('writeFile', 'input', await fetchFile(video)) }


        ffmpeg.setProgress(({ ratio }) => {
            console.log(ratio)
            setProgress(Math.round((ratio + Number.EPSILON) * 100) / 100 * 100);
        });

        switch (ratio) {
            case 'landscape':
                switch (style) {
                    case 'cropping':
                        await ffmpeg.run('-i', 'input', '-vf', 'crop=16/9*ih:ih, scale=1920:1080', 'output.mp4');
                        break;
                    case 'squeezing':
                        await ffmpeg.run('-i', 'input', '-vf', 'scale=1920:1080, setdar=16/9', 'output.mp4');
                        break;
                    case 'padding':
                        await ffmpeg.run('-i', 'input', '-vf', "pad=iw:iw/16*9:(ow-iw)/2:(oh-ih)/2, scale=1920:1080", 'output.mp4');
                        break;
                }
                break;

            case 'square':
                switch (style) {
                    case 'cropping':
                        await ffmpeg.run('-i', 'input', '-vf', 'crop=1/1*ih:ih, scale=1080:1080', 'output.mp4');
                        break;
                    case 'squeezing':
                        await ffmpeg.run('-i', 'input', '-vf', 'scale=1080:1080, setdar=1/1', 'output.mp4');
                        break;
                    case 'padding':
                        await ffmpeg.run('-i', 'input', '-vf', "pad=iw:iw/1*1:(ow-iw)/2:(oh-ih)/2, scale=1080:1080", 'output.mp4');
                        break;
                }
                break;

            case 'portrait':
                switch (style) {
                    case 'cropping':
                        await ffmpeg.run('-i', 'input', '-vf', 'crop=9/16*ih:ih, scale=1080:1920', 'output.mp4');
                        break;
                    case 'squeezing':
                        await ffmpeg.run('-i', 'input', '-vf', 'scale=1080:1920, setdar=9/16', 'output.mp4');
                        break;
                    case 'padding':
                        await ffmpeg.run('-i', 'input', '-vf', "pad=iw:iw/9*16:(ow-iw)/2:(oh-ih)/2, scale=1080:1920", 'output.mp4');
                        break;
                }
                break;
        }


        const outputData = ffmpeg.FS('readFile', 'output.mp4');
        setOutput(URL.createObjectURL(new Blob([outputData], { type: 'video/mp4' })));
    }

    const updateRatio = (e) => {
        const selectedRatio = e.target.value;
        setRatio(selectedRatio);
        console.log(selectedRatio);
    }

    const updateStyle = (e) => {
        const selectedStyle = e.target.value;
        setStyle(selectedStyle);
        console.log(selectedStyle);
    }


    return (
        <Fragment>
            <div className='resize-tool'>
                <select onChange={updateRatio}>
                    <option value="landscape">LANDSCAPE</option>
                    <option value="square">SQUARE</option>
                    <option value="portrait">PORTRAIT</option>

                </select>

                <select onChange={updateStyle}>
                    <option value="cropping">CROPPING</option>
                    <option value="squeezing">SQUEEZING</option>
                    <option value="padding">PADDING</option>
                </select>

                <button onClick={resizeVideo}>Resize</button>
            </div>


        </Fragment>
    )
}
export default Resize;