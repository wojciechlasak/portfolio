import React from 'react';
import FooterIcon from './FooterIcon';
import Github from '../media/git.png';
import Insta from '../media/insta.png';
import Linkedin from '../media/Linkedin.png';
import '../styles/footer.scss';

const Footer = () => {
 return (
  <footer className="flexc">
    <div className="flexr ficon-container">
      <FooterIcon src={Github} alt='github' link="https://github.com/wojciechlasak/" />
      <FooterIcon src={Insta} alt='instagram' link="https://www.instagram.com/wojciech_lasak/" />
      <FooterIcon src={Linkedin} alt='linkedin' link="https://www.linkedin.com/in/wojciech-lasak-b80a63159/" />
    </div>
    <h5>
      Wojciech Lasak&nbsp;
      <span>2021</span>
    </h5>
  </footer>
 )
}

export default Footer;