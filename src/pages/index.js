import React, { useEffect, useRef, useState } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Nav from '../components/Nav';
import Top from '../components/Top';
import Skills from '../components/Skills';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/main.scss';

const IndexPage = () => {
  const topRef = useRef();
  const skillsRef = useRef();
  const aboutRef = useRef();
  const contactRef = useRef();
  const [currentSection, setCurrentSection] = useState(null);

  const checkCurrentSection = () => {
    const sections = [
      {
        offset: topRef.current.offsetTop,
        name: 'top',
      },
      {
        offset: skillsRef.current.offsetTop,
        name: 'skills',
      },
      {
        offset: aboutRef.current.offsetTop,
        name: 'about',
      },
      {
        offset: contactRef.current.offsetTop,
        name: 'contact',
      },
    ];

    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = winScroll;

    sections.forEach(section => {
      if (section.offset <= scrolled && currentSection !== section.name) {
        setCurrentSection(section.name);
      }
    });
  };

  useEffect(() => {
    smoothscroll.polyfill();
    checkCurrentSection();
    window.addEventListener('scroll', checkCurrentSection);

    return () => {
      window.removeEventListener('scroll', checkCurrentSection);
    };
  }, []);

  const handleScroll = section => {
    switch (section) {
      case 'Top':
        topRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Skills':
        skillsRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'About':
        aboutRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      case 'Contact':
        contactRef.current.scrollIntoView({ behavior: 'smooth' });
        break;
      default:
        break;
    }
  };

  return (
    <>
      <Nav goTo={handleScroll} currentSection={currentSection} />
      <Top ref={topRef} goTo={handleScroll} />
      <Skills ref={skillsRef} />
      <About ref={aboutRef} />
      <Contact ref={contactRef} />
      <Footer />
    </>
  );
};

export default IndexPage;
