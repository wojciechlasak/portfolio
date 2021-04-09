import React, { useState } from 'react';
import NavLink from '../components/NavLink';
import '../styles/nav.scss';

const Nav = ({ goTo, currentSection, sections }) => {
  const [isShow, setIsShow] = useState(false);

  return (
    <>
      <button
        className={isShow ? 'burger burger-show' : 'burger'}
        onClick={() => setIsShow(prevIsShow => !prevIsShow)}
      />
      <nav style={{ right: isShow ? 0 : '-200px' }}>
        <div className="nav-container flexc">
          {sections.map(section => (
            <NavLink
              key={section.slug}
              title={section.name}
              onClick={() => goTo(section.slug)}
              isCurrent={currentSection === section.slug}
            />
          ))}
        </div>
      </nav>
    </>
  );
};

export default Nav;
