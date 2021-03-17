import * as React from 'react';
import Top from '../components/Top';
import Skills from '../components/Skills';
import About from '../components/About';
import '../styles/main.scss';

const IndexPage = () => {
  return (
    <>
      <Top />
      <Skills />
      <About />
    </>
  );
};

export default IndexPage;
