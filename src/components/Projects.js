import React from 'react';
import { PROJECTS } from '../constants/projects';
import Project from './Project';
import '../styles/projects.scss';

const Projects = () => {
  return (
    <div
      className="projects-container"
      style={{
        gridTemplateColumns: `repeat(${PROJECTS.length / 3}, 1fr)`,
        gridTemplateRows: `repeat(${PROJECTS.length / 3}, 1fr)`,
      }}
    >
      {PROJECTS.map(project => (
        <Project project={project} />
      ))}
    </div>
  );
};

export default Projects;
