import React, { Fragment, useState, useEffect } from 'react';

import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg';
const ffmpeg = createFFmpeg({ log: true });

function App() {
  const [ready, setReady] = useState(false);
  const load = async () => {
    await ffmpeg.load();
    setReady(true);
  }

  useEffect(() => {
    load();
  }, [])


  return ready ? (
    <Fragment>

    </Fragment>
  ) : (
    <Fragment>

    </Fragment>
  );
}

export default App;
