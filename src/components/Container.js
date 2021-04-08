import React, { useRef } from 'react';
import Air from './Air';

const Container = ({ children, name, title }) => {
  const ref = useRef(null);
  return (
    <div className="content column flexc separator">
      <Air />
      <h2>{title}</h2>
      {children}
      <Air />
    </div>
  );
};

export default Container;
