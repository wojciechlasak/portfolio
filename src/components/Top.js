import React, { forwardRef } from 'react';
import Air from './Air';
import '../styles/top.scss';

const Top = ({ goTo }, ref) => {
  return (
    <header className="column flexc" ref={ref}>
      <div className="top-container flexc column">
        <h1>Hi, I'm Wojciech Lasak</h1>
        <h1>Web developer</h1>
        <Air />
        <h3>Let me intruduce myself</h3>
        <Air height={'1.5em'} />
        <div className="flexc">
          <svg
            className="scroll-img"
            viewBox="0 0 100 50"
            onClick={() => {
              goTo('Skills');
            }}
          >
            <path d="M0 25L70 25"></path>
            <path d="M70 10L70 40L90 25z"></path>
          </svg>
        </div>
      </div>
    </header>
  );
};

export default forwardRef(Top);
