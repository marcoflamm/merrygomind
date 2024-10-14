const init = () => {
  const marquee = document.querySelector('[wb-data="marquee"]');
  if (!marquee) {
    return;
  }
  const duration = parseInt(marquee.getAttribute("duration"), 10) || 5;
  const marqueeContent = marquee.firstChild;
  if (!marqueeContent) {
    return;
  }

  const marqueeContentClone = marqueeContent.cloneNode(true);
  marquee.append(marqueeContentClone);

  let tween;

  const playMarquee = () => {
    let progress = tween ? tween.progress() : 0;
    tween && tween.progress(0).kill();
    const width = parseInt(getComputedStyle(marqueeContent).getPropertyValue("width"), 10);
    const gap = parseInt(getComputedStyle(marqueeContent).getPropertyValue("column-gap"), 10);
    const distanceToTranslate = -1 * (gap + width);

    tween = gsap.fromTo(
      marquee.children, { x: 0 }, {
        x: distanceToTranslate,
        duration,
        ease: "none",
        repeat: -
          1
      }
    );
    tween.progress(progress);
  };

  playMarquee();

  function debounce(func) {
    var timer;
    return function (event) {
      if (timer) clearTimeout(timer);
      timer = setTimeout(() => {
        func();
      }, 500, event);
    };
  }

  window.addEventListener("resize", debounce(playMarquee));
};

// Call init directly
init();
