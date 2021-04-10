import React from 'react';
import { PROJECTS } from '../constants/projects';
import Project from './Project';
import '../styles/projects.scss';

const Projects = () => {
  return (
    <div className="projects-container column">
      {PROJECTS.map(project => (
        <Project key={project.name} project={project} />
      ))}
    </div>
  );
};

export default Projects;
