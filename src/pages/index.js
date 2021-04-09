import React, { useEffect, useRef, useState, useCallback } from 'react';
import smoothscroll from 'smoothscroll-polyfill';
import Container from '../components/Container';
import Nav from '../components/Nav';
import Top from '../components/Top';
import Skills from '../components/Skills';
import About from '../components/About';
import Projects from '../components/Projects';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/main.scss';

const IndexPage = () => {
  const topRef = useRef();
  const skillsRef = useRef();
  const aboutRef = useRef();
  const projectsRef = useRef();
  const contactRef = useRef();
  const [currentSection, setCurrentSection] = useState(null);
  const [sections, setSections] = useState([]);

  const checkCurrentSection = useCallback(() => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop;

    const scrolled = winScroll;

    sections.forEach(section => {
      if (
        currentSection !== section.slug &&
        section.ref.current.offsetTop <= scrolled
      ) {
        setCurrentSection(section.slug);
      }
    });
  }, [sections]);

  useEffect(() => {
    setSections([
      {
        ref: topRef,
        name: 'Home',
        slug: 'top',
      },
      {
        ref: skillsRef,
        name: 'Skills',
        slug: 'skills',
      },
      {
        ref: aboutRef,
        name: 'About',
        slug: 'about',
      },
      {
        ref: projectsRef,
        name: 'Projects',
        slug: 'projects',
      },
      {
        ref: contactRef,
        name: 'Contact',
        slug: 'contact',
      },
    ]);
  }, []);

  useEffect(() => {
    smoothscroll.polyfill();
    checkCurrentSection();
    window.addEventListener('scroll', checkCurrentSection);

    return () => {
      window.removeEventListener('scroll', checkCurrentSection);
    };
  }, [sections]);

  const handleScroll = sectionSlug => {
    sections.forEach(section => {
      if (section.slug === sectionSlug)
        section.ref.current.scrollIntoView({ behavior: 'smooth' });
    });
  };

  return (
    <>
      <Nav
        goTo={handleScroll}
        sections={sections}
        currentSection={currentSection}
      />
      <Top ref={topRef} goTo={handleScroll} />
      <Container title="Skills" ref={skillsRef}>
        <Skills />
      </Container>
      <Container title="About" ref={aboutRef}>
        <About />
      </Container>
      <Container title="Projects" ref={projectsRef}>
        <Projects />
      </Container>
      <Container title="Contact" ref={contactRef}>
        <Contact />
      </Container>
      <Footer />
    </>
  );
};

export default IndexPage;
