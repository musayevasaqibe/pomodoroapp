import React, {Dispatch, SetStateAction, FC } from 'react';

interface SettingProps {
  sessionLength: number;
  setSessionLength:Dispatch<SetStateAction<number>>;
  breakLength: number;
  setBreakLength: Dispatch<SetStateAction<number>>;
}

const Settings: FC<SettingProps> = ({ sessionLength, setSessionLength, breakLength, setBreakLength}) => {
  return (
    <div className="settings">
      <div className="setting">
        <label>Session Length (minutes):</label>
        <input type='number' value={sessionLength} onChange={(e) => setSessionLength(Math.max(1, Number(e.target.value)))}/>
      </div>
      <div className="setting">
        <label>Break Length (minutes):</label>
        <input type='number' value={breakLength} onChange={(e) => setBreakLength(Math.max(1, Number(e.target.value)))}/>
      </div>
    </div>
  );
};
export default Settings;