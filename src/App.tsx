import React, { Fragment, useState, useEffect } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';

const ffmpeg = createFFmpeg({
  log: true,
  corePath: 'https://unpkg.com/@ffmpeg/core@0.10.0/dist/ffmpeg-core.js',
});

function App() {

  const [ready, setReady] = useState(false);

  // loading ffmpeg
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])



  return ready ? (

    <Fragment>
      <p>Loaded...</p>
    </Fragment>

  ) : (

    <Fragment>
      <p>Loading...</p>
    </Fragment>

  );
}

export default App;
