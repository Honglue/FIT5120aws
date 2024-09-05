import React from 'react';
import './InputBar.css';

const InputBar: React.FC = () => {
  return (
    <div className="input-bar">
      <div className="input-group">
        <div className="input-field">
          <label>Age</label>
          <input type="text" placeholder="Add age" />
        </div>
        <div className="input-field">
          <label>Gender</label>
          <input type="text" placeholder="Add gender" />
        </div>
        <div className="input-field">
          <label>Weight</label>
          <input type="text" placeholder="Add weight" />
        </div>
        <div className="input-field">
          <label>Height</label>
          <input type="text" placeholder="Add height" />
        </div>
        <button className="calculate-button">Calculate</button>
      </div>
    </div>
  );
};

export default InputBar;
