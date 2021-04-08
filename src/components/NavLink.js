import React from 'react';
import '../styles/nav.scss';

const NavLink = ({ title, onClick, isCurrent }) => (
  <div className={isCurrent ? 'nav-link active' : 'nav-link'} onClick={onClick}>
    {title}
  </div>
);

export default NavLink;
