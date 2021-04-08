import React from 'react';

const FooterIcon = ({src, link, alt}) => {
  return (
    <a target="_blank" href={link}>
      <img className="ficon" src={src} alt={alt} />
    </a>
  )
}

export default FooterIcon;