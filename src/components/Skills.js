import React, { useState, forwardRef } from 'react';
import Container from './Container';
import Snake from './Snake';
import Battery from './Battery';
import { SKILLS_ICONS } from '../constants/skillIcons';

const Skills = (props, ref) => {
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

  return (
    <Container title="Skills" ref={ref}>
      <div className="flex">
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
          style={{ width: shouldShowSnake ? '50%' : '50em' }}
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
              onClick={() => {
                setIsPause(false);
              }}
            >
              Play Again
            </div>
          )}
        </div>
      )}
    </Container>
  );
};

export default forwardRef(Skills);
