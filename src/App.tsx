import React, { Fragment, useState, useEffect } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
import { url } from 'inspector';

const ffmpeg = createFFmpeg({
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
});

function App() {

  const [ready, setReady] = useState(false);
  const [video, setVideo] = useState<File>();


  // loading ffmpeg
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])


  const updateInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files[0];
    setVideo(file);
    console.log(file);
  }


  return ready ? (

    <Fragment>

      <input type="file"
        id="video"
        accept='video/mp4'
        onChange={updateInput}
      />

      {video && <video controls
        width="250"
        src={URL.createObjectURL(video)}>
      </video>
      }

    </Fragment>

  ) : (

    <Fragment>
      <p>Loading...</p>
    </Fragment>

  );
}

export default App;
