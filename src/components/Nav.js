import React, { useState } from 'react';
import '../styles/nav.scss';

const Nav = () => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <button
        className={isShow ? 'burger burger-show' : 'burger'}
        onClick={() => setIsShow(prevIsShow => !prevIsShow)}
      />
      <nav style={{ right: isShow ? 0 : '-200px' }}>
        <div className="nav-container flexc">
          <a href="#top">
            <div class="nav-link">Home</div>
          </a>
          <a href="#snake">
            <div class="nav-link">Skills</div>
          </a>
          <a href="#about">
            <div class="nav-link">About</div>
          </a>
          <a href="#projects">
            <div class="nav-link">Projects</div>
          </a>
          <a href="#form">
            <div class="nav-link">Contact</div>
          </a>
        </div>
      </nav>
    </>
  );
};

export default Nav;
