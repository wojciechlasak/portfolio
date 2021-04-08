import React from 'react';
import '../styles/battery.scss';

const Battery = ({ skillIcon, skillName, batteryLevel, active }) => {
  const getColor = batteryLevel => {
    switch (batteryLevel) {
      case 1:
        return '#649655';
      case 2:
        return '#c1b051';
      case 3:
        return '#af6057';
      default:
        return '#434343';
    }
  };
  const getHeight = batteryLevel => {
    switch (batteryLevel) {
      case 1:
        return '100%';
      case 2:
        return '66.6666%';
      case 3:
        return '33.3333%';
      default:
        return '0';
    }
  };
  return (
    <div className="col4 column flex">
      <div className="battery-container">
        <div className="battery-head"></div>
        <div className="battery-body">
          <div className="skill-icon">
            <img src={skillIcon} alt={skillName} />
            <h4>{skillName}</h4>
          </div>
          <div
            className="battery-body-in"
            style={{
              backgroundColor: getColor(batteryLevel),
              height: active ? getHeight(batteryLevel) : 0,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Battery;
