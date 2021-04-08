import React, { useEffect, useRef } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Nav from '../components/Nav';
import Top from '../components/Top';
import Skills from '../components/Skills';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/main.scss';

const IndexPage = () => {
  // const topRef = useRef();
  // const skillsRef = useRef();
  // const aboutRef = useRef();
  // const contactRef = useRef();

  useEffect(() => {
    smoothscroll.polyfill();
  }, []);

  // const handleScroll = (section, ref) => {
  //   // ref.current.scrollIntoView({ behavior: 'smooth' });
  //   switch (section) {
  //     case 'top':
  //       topRef.current.scrollIntoView({ behavior: 'smooth' });
  //       break;
  //     case 'skills':
  //       skillsRef.current.scrollIntoView({ behavior: 'smooth' });
  //       break;
  //     case 'about':
  //       aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  //       break;
  //     case 'contact':
  //       contactRef.current.scrollIntoView({ behavior: 'smooth' });
  //       break;
  //     default:
  //       break;
  //   }
  // };

  return (
    <>
      <Nav />
      <Top />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default IndexPage;
