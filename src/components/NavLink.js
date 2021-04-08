import React from 'react';
import '../styles/nav.scss';

const NavLink = ({ ref, title }) => (
  <a href={ref}>
    <div className="nav-link">{title}</div>
  </a>
);

export default NavLink;
