import React, { useState } from 'react';
import Timer from './components/Timer';
import Settings from './components/Settings';
import './styles/main.scss';

const App: React.FC = () => {
  const [sessionLength, setSessionLength] = useState(25);
  const [breakLength, setBreakLength] = useState(5);

  return (
<div className="app">
  <h1>Pomodoro Timer</h1>
  <Settings 
  sessionLength={sessionLength} 
  setSessionLength={setSessionLength} 
  breakLength={breakLength}
  setBreakLength={setBreakLength}/>
  <Timer
   sessionLength={sessionLength} 
   breakLength={breakLength}/>
</div>
  )
}

export default App