import React, { Fragment, useState, useEffect } from 'react';
import { createFFmpeg } from '@ffmpeg/ffmpeg';
import './app.css';
import { Header, Player, Upload, Trim, Resize } from './components';



const ffmpeg = createFFmpeg({
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
});

function App() {

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<any>();
  const [trimedVideo, setTrimedVideo] = useState('');
  const [style, setStyle] = useState('cropping');

  const [landscape, setLandscape] = useState('');
  const [square, setSquare] = useState('');
  const [portrait, setPortrait] = useState('');

  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [progress, setProgress] = useState('0');



  // loading ffmpeg
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])



  return (

    <Fragment>

      <Header />

      {ready ? (
        <>
          {landscape ? (
            <>
              <Player landscape={landscape} square={square} portrait={portrait} />
            </>

          ) : (
            <>
              {video ? (
                <>
                  <div className='tool-card'>
                    {trimedVideo ? (<div className='preview-card'>
                      <video
                        width="100%"
                        height="100%"
                        controls
                        src={trimedVideo}>
                      </video>
                    </div>

                    ) : (video && <div className='preview-card'>
                      <video
                        width="100%"
                        height="100%"
                        controls
                        src={video}>
                      </video></div>)}
                    <div className='progress-div'>
                      {progress && progress} %
                    </div>
                    <div>
                      <Trim
                        ffmpeg={ffmpeg}
                        start={start}
                        end={end}
                        setTrimedVideo={setTrimedVideo}
                        setStart={setStart}
                        setEnd={setEnd}
                        video={video}
                        setProgress={setProgress} />
                    </div>
                    <div>
                      <Resize
                        ffmpeg={ffmpeg}
                        trimedVideo={trimedVideo}
                        style={style}
                        setLandscape={setLandscape}
                        setSquare={setSquare}
                        setPortrait={setPortrait}
                        setStyle={setStyle}
                        video={video}
                        setProgress={setProgress} />
                    </div>
                  </div>
                </>

              ) : (
                <>
                  <Upload setVideo={setVideo} />
                </>)}

            </>)}

        </>
      ) : (<span className="loader"></span>)
      }

    </Fragment >

  )
}

export default App;
