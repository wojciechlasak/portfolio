import React from 'react';
import '../styles/projects.scss';

const Project = ({ project }) => {
  return (
    <div
      key={project.name}
      className="project"
      style={{ backgroundImage: `url(${project.bg})` }}
    >
      <div className="project-desc">
        <p>{project.desc}</p>
      </div>
      <div className="project-overlay" />
      <div className="project-in flexc">
        <div className="project-title">{project.name}</div>
        {project.codeLink && (
          <a href={project.codeLink} target="_blank" className="project-button">
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
    </div>
  );
};

export default Project;
