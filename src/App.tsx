import React, { Fragment, useState, useEffect } from 'react';
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import './app.css';
import { Player } from './components';



const ffmpeg = createFFmpeg({
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
});

function App() {

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<any>();
  const [trimedVideo, setTrimedVideo] = useState('');
  const [style, setStyle] = useState('squeezing');

  const [landscape, setLandscape] = useState('');
  const [square, setSquare] = useState('');
  const [portrait, setPortrait] = useState('');

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');



  // loading ffmpeg
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])


  const trimVideo = async () => {
    ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(video));
    ffmpeg.setProgress(({ ratio }) => {
      console.log(ratio);
    });

    console.log('-i', 'input.mp4', '-ss', start, '-to', end, 'output.mp4');

    await ffmpeg.run('-i', 'input.mp4', '-ss', start, '-to', end, 'output.mp4');
    const Data = ffmpeg.FS('readFile', 'output.mp4');
    setTrimedVideo(URL.createObjectURL(new Blob([Data.buffer], { type: 'video/mp4' })));
  }

  // function to resize video
  const resizeVideo = async () => {

    if (trimedVideo) { ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(trimedVideo)); } else { ffmpeg.FS('writeFile', 'input.mp4', await fetchFile(video)) }


    ffmpeg.setProgress(({ ratio }) => {
      console.log(ratio);
    });

    switch (style) {
      case 'squeezing':
        await ffmpeg.run('-i', 'input.mp4', '-vf', 'scale=1920:1080, setdar=16/9', 'landscape.mp4');
        await ffmpeg.run('-i', 'input.mp4', '-vf', 'scale=1080:1080, setdar=1/1', 'square.mp4');
        await ffmpeg.run('-i', 'input.mp4', '-vf', 'scale=1080:1920, setdar=9/16', 'portrait.mp4');
        break;

      case 'cropping':
        await ffmpeg.run('-i', 'input.mp4', '-vf', 'crop=16/9*ih:ih, scale=1920:1080', 'landscape.mp4');
        await ffmpeg.run('-i', 'input.mp4', '-vf', 'crop=1/1*ih:ih, scale=1080:1080', 'square.mp4');
        await ffmpeg.run('-i', 'input.mp4', '-vf', 'crop=9/16*ih:ih, scale=1080:1920', 'portrait.mp4');
        break;

      case 'padding':
        await ffmpeg.run('-i', 'input.mp4', '-vf', "pad=iw:iw/16*9:(ow-iw)/2:(oh-ih)/2, scale=1920:1080", 'landscape.mp4');
        await ffmpeg.run('-i', 'input.mp4', '-vf', "pad=iw:iw/1*1:(ow-iw)/2:(oh-ih)/2, scale=1080:1080", 'square.mp4');
        await ffmpeg.run('-i', 'input.mp4', '-vf', "pad=iw:iw/9*16:(ow-iw)/2:(oh-ih)/2, scale=1080:1920", 'portrait.mp4');
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

  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = URL.createObjectURL(e.target.files[0]);
    setVideo(file);
    console.log(file);
  }

  const updateStart = (e) => {
    setStart(e.target.value);
  }

  const updateEnd = (e) => {
    setEnd(e.target.value);
  }

  return ready ? (

    <Fragment>

      <div className='upload'>

        <input type="file"
          id="video"
          accept='video/mp4'
          onChange={updateInput}
        />

      </div>



      <input type="text" placeholder='00:00:00' onChange={updateStart} />
      <input type="text" placeholder='00:00:00' onChange={updateEnd} />
      <button onClick={trimVideo}>Trim</button>








      <select name="" id="" onChange={updateStyle}>
        <option value="squeezing">Squeezing</option>
        <option value="cropping">Cropping</option>
        <option value="padding">Padding</option>
      </select>

      {trimedVideo ? <video controls
        width="250"
        src={trimedVideo}>
      </video>
        : video && <video controls
          width="250"
          src={video}>
        </video>
      }



      <button onClick={resizeVideo}>Convert</button>


      {landscape && <Player videoSrc={landscape} />}
      {square && <Player videoSrc={square} />}
      {portrait && <Player videoSrc={portrait} />}


      {start} {end}

    </Fragment>

  ) : (

    <Fragment>
      <p>Loading...</p>
    </Fragment>

  );
}

export default App;
