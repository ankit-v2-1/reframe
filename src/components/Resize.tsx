import { Fragment } from 'react';
import { fetchFile } from '@ffmpeg/ffmpeg';
import './Resize.css'


const Resize = ({ ffmpeg, trimedVideo, style, setLandscape, setSquare, setPortrait, setStyle, video, setProgress }) => {

    // function to resize video
    const resizeVideo = async () => {

        if (trimedVideo) { ffmpeg.FS('writeFile', 'input', await fetchFile(trimedVideo)); } else { ffmpeg.FS('writeFile', 'input', await fetchFile(video)) }


        ffmpeg.setProgress(({ ratio }) => {
            console.log(ratio)
            setProgress(Math.round((ratio + Number.EPSILON) * 100) / 100 * 100);
        });

        switch (style) {
            case 'squeezing':
                await ffmpeg.run('-i', 'input', '-vf', 'scale=1920:1080, setdar=16/9', 'landscape.mp4');
                await ffmpeg.run('-i', 'input', '-vf', 'scale=1080:1080, setdar=1/1', 'square.mp4');
                await ffmpeg.run('-i', 'input', '-vf', 'scale=1080:1920, setdar=9/16', 'portrait.mp4');
                break;

            case 'cropping':
                await ffmpeg.run('-i', 'input', '-vf', 'crop=16/9*ih:ih, scale=1920:1080', 'landscape.mp4');
                await ffmpeg.run('-i', 'input', '-vf', 'crop=1/1*ih:ih, scale=1080:1080', 'square.mp4');
                await ffmpeg.run('-i', 'input', '-vf', 'crop=9/16*ih:ih, scale=1080:1920', 'portrait.mp4');
                break;

            case 'padding':
                await ffmpeg.run('-i', 'input', '-vf', "pad=iw:iw/16*9:(ow-iw)/2:(oh-ih)/2, scale=1920:1080", 'landscape.mp4');
                await ffmpeg.run('-i', 'input', '-vf', "pad=iw:iw/1*1:(ow-iw)/2:(oh-ih)/2, scale=1080:1080", 'square.mp4');
                await ffmpeg.run('-i', 'input', '-vf', "pad=iw:iw/9*16:(ow-iw)/2:(oh-ih)/2, scale=1080:1920", 'portrait.mp4');
                break;
        }

        const landscapeData = ffmpeg.FS('readFile', 'landscape.mp4');
        const squareData = ffmpeg.FS('readFile', 'square.mp4');
        const portraitData = ffmpeg.FS('readFile', 'portrait.mp4');

        setLandscape(URL.createObjectURL(new Blob([landscapeData], { type: 'video/mp4' })));
        setSquare(URL.createObjectURL(new Blob([squareData.buffer], { type: 'video/mp4' })));
        setPortrait(URL.createObjectURL(new Blob([portraitData.buffer], { type: 'video/mp4' })));
    }


    const updateStyle = (e) => {
        const selectedStyle = e.target.value;
        setStyle(selectedStyle);
        console.log(selectedStyle);
    }


    return (
        <Fragment>
            <div className='resize-tool'>
                <select name="" id="" onChange={updateStyle}>
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