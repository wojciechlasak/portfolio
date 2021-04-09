import React from 'react';
import '../styles/projects.scss';
import { PROJECTS } from '../constants/projects';

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
        <div
          className="project flexc"
          style={{ backgroundImage: `url(${project.bg})` }}
        >
          <div className="project-title">{project.name}</div>
          <div className="project-overlay" />
          {project.codeLink && (
            <a
              href={project.codeLink}
              target="_blank"
              className="project-button"
            >
              <button>See code</button>
            </a>
          )}
          {project.previewLink && (
            <a
              href={project.previewLink}
              target="_blank"
              className="project-button"
            >
              <button>See project</button>
            </a>
          )}
        </div>
      ))}
    </div>
  );
};

export default Projects;
