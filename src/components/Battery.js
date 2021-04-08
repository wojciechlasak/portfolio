import React from 'react';
import '../styles/battery.scss';

const Battery = ({skillIcon, skillName, batteryLevel, active}) => {
  console.log(skillIcon);
  const getColor = (batteryLevel) => {
    switch(batteryLevel) {
      case 1:
        return '#649655';
      case 2:
        return '#c1b051';
      case 3:
        return '#af6057';
      default:
        return "#434343";
    }
  }
  return (
    <div className="col3 column flex">
      <div className="battery-container">
        <div className="battery-head"></div>
        <div className="battery-body">
          <div className="skill-icon">
            <img src={skillIcon} alt={skillName} />
            <h4>{skillName}</h4>
            </div>
          <div className="battery-body-in" style={{
            backgroundColor: getColor(batteryLevel),
            height: active ? '100%' : 0, 
          }}/>
        </div>
      </div>
    </div>
  )
}

export default Battery