import React, { useState } from 'react';
import ProfileImg from '../media/wojtek.jpg';
import MountainImg from '../media/rysy.jpeg';

const About = () => {
  const [isMountains, setIsMountains] = useState(false);

  const handleSpanClick = () => {
    setIsMountains(true);
    setTimeout(() => {
      setIsMountains(false);
    }, 3000);
  };
  return (
    <div className="flex">
      <div className="col2 column">
        <img src={isMountains ? MountainImg : ProfileImg} alt="wojtek" />
      </div>
      <div className="col2 column flex flex-align-end">
        <p>
          I am fifth year IT student at Jagiellonian University.
          <br />
          <br /> The title of my Bachelor's thesis was{' '}
          <strong>
            Interactive application for booking accommodation rooms
          </strong>
          . I was using React.js in front and Node.js/Express.js in back, also I
          used MySQL database.
          <br />
          <br /> I have been creating websites for six years, trying to learn
          newer and newer technologies but always I remember the fact that every
          based on JavaScript.
          <br />
          <br /> Last summer I did intership in x-kom. I was working in
          eight-man team in SCRUM methodology. We were rewritting website to
          React.js. I learned about TypeScript, Redux, Jest.
          <br />
          <br /> In my spare time I play volleyball and I like spending time in
          the <span onClick={handleSpanClick}>Tatra Mountains</span>, doing all
          available activities such as climbing, hiking, skiing.
        </p>
      </div>
    </div>
  );
};

export default About;
