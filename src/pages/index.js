import * as React from 'react';
import Top from '../components/Top';
import Skills from '../components/Skills';
import About from '../components/About';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import '../styles/main.scss';

const IndexPage = () => {
  return (
    <>
      <Top />
      <Skills />
      <About />
      <Contact />
      <Footer />
    </>
  );
};

export default IndexPage;
