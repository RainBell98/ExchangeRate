import React from 'react';
import { FaCog, FaDollarSign } from 'react-icons/fa';
import './SpinningGear.css'; // 스타일링을 위한 CSS 파일

class SpinningGear extends React.Component {
  render() {
    return (
      <>
        <div className="gear-container">
          <FaCog className="spinning-gear" size={150} />

          <FaDollarSign className="dollar-icon" />
        </div>
      </>
    );
  }
}

export default SpinningGear;
