import React, { useRef } from 'react';

const Container = ({ children, name, title }) => {
  const ref = useRef(null);
  return (
    <div className="content column flexc separator">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default Container;
