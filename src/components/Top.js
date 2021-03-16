import React, { useState, useEffect, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Air from './Air';
import '../styles/top.scss';

smoothscroll.polyfill();

const Top = () => {
  const [height, setHeight] = useState(0);
  const refHeader = useRef(null);

  useEffect(() => {
    setHeight(refHeader.current.clientHeight);
  });

  const handleScrollClick = () => {
    window.scrollTo({ top: height, behavior: 'smooth' });
  };

  return (
    <header ref={refHeader} className="column flexc">
      <div className="top-container flexc column">
        <h1>Hi, I'm Wojciech Lasak</h1>
        <h1>Web developer</h1>
        <Air />
        <h3>Let me intruduce myself</h3>
        <Air height={'1.5em'} />
        <div class="flexc" onClick={handleScrollClick}>
          <svg class="scroll-img" viewBox="0 0 100 50">
            <path d="M0 25L70 25"></path>
            <path d="M70 10L70 40L90 25z"></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default Top;
