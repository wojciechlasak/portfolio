import React, { useState, useEffect } from 'react';
import Snake from './Snake';
import Battery from './Battery';
import { SKILLS_ICONS } from '../constants/skillIcons';

const Skills = () => {
  const [isPause, setIsPause] = useState(true);
  const [isShowEnd, setIsShowEnd] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [isShowRepeat, setIsShowRepeat] = useState(false);
  const [shouldShowSnake, setShouldShowSnake] = useState(true);
  const [shouldShowSnakeButtons, setShouldSnakeButtons] = useState(true);
  const [skillsIcons, setSkillsIcons] = useState(
    SKILLS_ICONS.map((icon, index) => ({
      ...icon,
      isShow: false,
      index: index,
    }))
  );

  const checkWidth = () => {
    const match = window.matchMedia(`(max-width: 1050px)`);
    if (match.matches) {
      setShouldShowSnake(false);
      setShouldSnakeButtons(false);
      setSkillsIcons(
        SKILLS_ICONS.map((icon, index) => ({
          ...icon,
          isShow: true,
          index: index,
        }))
      );
    } else {
      setShouldShowSnake(true);
      setShouldSnakeButtons(true);
      setSkillsIcons(
        SKILLS_ICONS.map((icon, index) => ({
          ...icon,
          isShow: false,
          index: index,
        }))
      );
    }
  };

  useEffect(() => {
    checkWidth();
    window.addEventListener('resize', checkWidth);
    return () => {
      window.removeEventListener('resize', checkWidth);
    };
  }, []);

  return (
    <>
      <div className="flex flex-mobile">
        {shouldShowSnake && (
          <div className="col2">
            <Snake
              isPause={isPause}
              isRepeat={isShowRepeat}
              skillsIcons={skillsIcons}
              handleChangeSkill={index => {
                const updateSkillsIcons = [...skillsIcons];
                updateSkillsIcons[index].isShow = true;
                setSkillsIcons(updateSkillsIcons);
              }}
              handlePause={pause => setIsPause(pause)}
              handleEnd={() => {
                setIsShowEnd(true);
                setIsPause(true);
              }}
              handleRepeat={() => setIsShowRepeat(true)}
            />
          </div>
        )}
        <div
          className="col2 column flex flex-wrap"
          style={{ width: shouldShowSnake ? '50%' : '100%' }}
        >
          {skillsIcons.map(skill => (
            <Battery
              key={skill.alt}
              skillIcon={skill.src}
              skillName={skill.alt}
              batteryLevel={skill.level}
              active={skill.isShow}
            />
          ))}
        </div>
      </div>
      {shouldShowSnakeButtons && (
        <div className="snake-button-container">
          {!isStart && (
            <div
              className="snake-button flexc"
              role="button"
              tabIndex="0"
              onClick={() => {
                setIsPause(false);
                setIsStart(true);
              }}
            >
              Start Game
              <h6>WSDA or arrow , p-pause</h6>
            </div>
          )}
          {isPause && isStart && !isShowEnd && (
            <div
              className="snake-button"
              role="button"
              tabIndex="0"
              onClick={() => {
                setIsPause(false);
                setIsShowRepeat(false);
              }}
            >
              Resume
            </div>
          )}
          {(!isStart || isShowRepeat) && (
            <div
              className="snake-button"
              role="button"
              tabIndex="0"
              onClick={() => {
                setShouldShowSnake(false);
                setShouldSnakeButtons(false);
                setSkillsIcons(prevSkillsIcons =>
                  prevSkillsIcons.map(value => ({
                    ...value,
                    isShow: true,
                  }))
                );
              }}
            >
              Skip
            </div>
          )}
          {isShowEnd && (
            <div
              className="snake-button"
              role="button"
              tabIndex="0"
              onClick={() => {
                setShouldShowSnake(false);
                setShouldSnakeButtons(false);
              }}
            >
              Game Over
            </div>
          )}
          {isShowRepeat && (
            <div
              className="snake-button"
              role="button"
              tabIndex="0"
              onClick={() => {
                setIsPause(false);
              }}
            >
              Play Again
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Skills;
