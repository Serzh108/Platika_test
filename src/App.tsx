import React from 'react';
import Scoreboard from './components/Scoreboard/Scoreboard';
import logo from './logo.svg';
import logoPlaytika from './logo-playtika.webp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <img src={logoPlaytika} className="App-logo" alt="logo" />
        <p>Title</p>
        <Scoreboard />
      </header>
    </div>
  );
}

export default App;
