import React, { useState, useEffect } from 'react';
import '../Stylesheet/ImageCarousel.css'; // Make sure to import your CSS file
import team from '../assets/img-team.jpg'
const ImageCarousel = () => {
  const [radius, setRadius] = useState(240);
  const [autoRotate, setAutoRotate] = useState(true);
  const [rotateSpeed, setRotateSpeed] = useState(-60);
  const [imgWidth] = useState(160);
  const [imgHeight] = useState(190);
  let tX = 0;
  let tY = 10;

  useEffect(() => {
    setTimeout(() => init(), 1000);
  }, []);

  useEffect(() => {
    if (autoRotate) {
      const animationName = rotateSpeed > 0 ? 'spin' : 'spinRevert';
      const ospin = document.getElementById('spin-container');
      ospin.style.animation = `${animationName} ${Math.abs(rotateSpeed)}s infinite linear`;
    }
  }, [autoRotate, rotateSpeed]);

  const init = (delayTime) => {
    const aEle = [...document.querySelectorAll('#spin-container img')];
    const ospin = document.getElementById('spin-container');

    ospin.style.width = `${imgWidth}px`;
    ospin.style.height = `${imgHeight}px`;

    for (let i = 0; i < aEle.length; i++) {
      aEle[i].style.transform = `rotateY(${i * (360 / aEle.length)}deg) translateZ(${radius}px)`;
      aEle[i].style.transition = `transform 1s`;
      aEle[i].style.transitionDelay = `${delayTime || (aEle.length - 1) / 4}s`;
    }
  };

  const applyTransform = (obj) => {
    if (tY > 180) tY = 180;
    if (tY < 0) tY = 0;

    obj.style.transform = `rotateX(${-tY}deg) rotateY(${tX}deg)`;
  };

  const playSpin = (yes) => {
    const ospin = document.getElementById('spin-container');
    ospin.style.animationPlayState = yes ? 'running' : 'paused';
  };

  // document.onpointerdown = (e) => {
  //   clearInterval(odrag.timer);
  //   e = e || window.Event;
  //   const sX = e.clientX;
  //   const sY = e.clientY;

  //   document.onpointermove = (e) => {
  //     e = e || window.Event;
  //     const nX = e.clientX;
  //     const nY = e.clientY;
  //     const desX = nX - sX;
  //     const desY = nY - sY;
  //     tX += desX * 0.1;
  //     tY += desY * 0.1;
  //     applyTransform(odrag);
  //     sX = nX;
  //     sY = nY;
  //   };

  //   document.onpointerup = (e) => {
  //     odrag.timer = setInterval(() => {
  //       desX *= 0.95;
  //       desY *= 0.95;
  //       tX += desX * 0.1;
  //       tY += desY * 0.1;
  //       applyTransform(odrag);
  //       playSpin(false);
  //       if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
  //         clearInterval(odrag.timer);
  //         playSpin(true);
  //       }
  //     }, 17);
  //     document.onpointermove = null;
  //     document.onpointerup = null;
  //   };

    return false;
  };

  document.onmousewheel = (e) => {
    e = e || window.Event;
    const d = e.wheelDelta / 20 || -e.detail;
    setRadius(radius + d);
    init(1);
  };

  const handlePointerDown = (e) => {
    clearInterval(odrag.timer);
    e = e || window.Event;
    let sX = e.clientX;
    let sY = e.clientY;

    const handlePointerMove = (e) => {
      e = e || window.Event;
      let nX = e.clientX;
      let nY = e.clientY;
      let desX = nX - sX;
      let desY = nY - sY;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTransform(odrag);
      sX = nX;
      sY = nY;
    };

    const handlePointerUp = (e) => {
      odrag.timer = setInterval(() => {
        desX *= 0.95;
        desY *= 0.95;
        tX += desX * 0.1;
        tY += desY * 0.1;
        applyTransform(odrag);
        playSpin(false);
        if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
          clearInterval(odrag.timer);
          playSpin(true);
        }
      }, 17);

      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerup', handlePointerUp);
    };

    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerup', handlePointerUp);

    e.preventDefault();
  };




  return (
    <div className='mt-52 font '>
      <div id="drag-container">
        <div id="spin-container">
          
            <div>     
            <div className='w-[20rem] h-[20rem]  text-[5rem] text-white '> Meet Our Team</div>
            </div>
            <img src={team} class="w-full rounded-t-lg" />
            <img src={team} class="w-full rounded-t-lg" />
            <img src={team} class="w-full rounded-t-lg" />
            <img src={team} class="w-full rounded-t-lg" />
            <img src={team} class="w-full rounded-t-lg" />
            <img src={team} class="w-full rounded-t-lg" />
            
        


        
          {/* <p>Our Team</p> */}
        </div>
        <div id="ground"></div>
      </div>
    </div>
  );


export default ImageCarousel;
