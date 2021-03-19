import React from 'react';
import Container from './Container';
import Snake from './Snake';

const Skills = () => {
  return (
    <Container title="Skills">
      <div className="flex">
        <div className="col2 ">
          <Snake />
        </div>
        <div className="col2 column"></div>
      </div>
    </Container>
  );
};

export default Skills;
