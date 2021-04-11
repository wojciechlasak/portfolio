import React, { useState } from 'react';
import '../styles/projects.scss';

const Project = ({ project }) => {
  const [isShowMore, setIsShowMore] = useState(false);

  return (
    <div
      className={isShowMore ? 'project active' : 'project'}
      style={{ backgroundImage: `url(${project.bg})` }}
      onClick={() => setIsShowMore(prevIsShowMore => !prevIsShowMore)}
      role="button"
      tabIndex="0"
    >
      <div className="project-desc">
        <p>{project.desc}</p>
      </div>
      <div className="project-overlay" />
      <div className="project-in flexc">
        <div className="project-title">{project.name}</div>
        {project.codeLink && (
          <a
            href={project.codeLink}
            target="_blank"
            className="project-button"
            rel="noopener noreferrer"
          >
            <button>See code</button>
          </a>
        )}
        {project.previewLink && (
          <a
            href={project.previewLink}
            target="_blank"
            className="project-button"
            rel="noopener noreferrer"
          >
            <button>See project</button>
          </a>
        )}
      </div>
    </div>
  );
};

export default Project;
