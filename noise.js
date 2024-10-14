const noise = () => {
  let canvases, ctxs = [];
  let wWidth, wHeight;
  let noiseData = [];
  let frame = 0;
  let loopTimeout;
  // Create Noise
  const createNoise = () => {
    const idata = ctxs[0].createImageData(wWidth, wHeight);
    const buffer32 = new Uint32Array(idata.data.buffer);
    const len = buffer32.length;
    for (let i = 0; i < len; i++) {
      if (Math.random() < 0.1) {
        buffer32[i] = 0xff000000;
      }
    }
    noiseData.push(idata);
  };
  // Play Noise
  const paintNoise = () => {
    if (frame === 9) {
      frame = 0;
    } else {
      frame++;
    }
    ctxs.forEach(ctx => ctx.putImageData(noiseData[frame], 0, 0));
  };
  // Loop
  const loop = () => {
    paintNoise(frame);
    loopTimeout = window.setTimeout(() => {
      window.requestAnimationFrame(loop);
    }, (1000 / 25));
  };
  // Setup
  const setup = () => {
    wWidth = window.innerWidth;
    wHeight = window.innerHeight;
    canvases.forEach(canvas => {
      canvas.width = wWidth;
      canvas.height = wHeight;
    });
    for (let i = 0; i < 10; i++) {
      createNoise();
    }
    loop();
  };
  // Reset
  let resizeThrottle;
  const reset = () => {
    window.addEventListener('resize', () => {
      window.clearTimeout(resizeThrottle);
      resizeThrottle = window.setTimeout(() => {
        window.clearTimeout(loopTimeout);
        setup();
      }, 200);
    }, false);
  };
  // Init
  const init = (() => {
    canvases = document.querySelectorAll('[noise="true"]');
    canvases.forEach(canvas => {
      ctxs.push(canvas.getContext('2d'));
    });
    setup();
  })();
};
noise();
