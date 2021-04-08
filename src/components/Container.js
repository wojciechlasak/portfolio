import React, { forwardRef } from 'react';
import Air from './Air';

const Container = ({ children, title }, ref) => {
  return (
    <div ref={ref} className="content column flexc separator">
      <Air />
      <h2>{title}</h2>
      {children}
      <Air />
    </div>
  );
};

export default forwardRef(Container);
