import React, { useState } from 'react';
import NavLink from '../components/NavLink';
import '../styles/nav.scss';

const Nav = ({ goTo, currentSection }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <button
        className={isShow ? 'burger burger-show' : 'burger'}
        onClick={() => setIsShow(prevIsShow => !prevIsShow)}
      />
      <nav style={{ right: isShow ? 0 : '-200px' }}>
        <div className="nav-container flexc">
          <NavLink
            title={'Home'}
            onClick={() => goTo('Top')}
            isCurrent={currentSection === 'top'}
          />
          <NavLink
            title={'Skills'}
            onClick={() => goTo('Skills')}
            isCurrent={currentSection === 'skills'}
          />
          <NavLink
            title={'About'}
            onClick={() => goTo('About')}
            isCurrent={currentSection === 'about'}
          />
          <NavLink
            title={'Contact'}
            onClick={() => goTo('Contact')}
            isCurrent={currentSection === 'contact'}
          />
        </div>
      </nav>
    </>
  );
};

export default Nav;
