import React from 'react';
import Scoreboard from './components/Scoreboard/Scoreboard';
import logoPlaytika from './logo-playtika.webp';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logoPlaytika} className="App-logo" alt="logo" />
      </header>
      <Scoreboard />
    </div>
  );
}

export default App;
