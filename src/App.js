import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar';
import usePersistedState from './utils/useCustomStorage';

function App() {

  const [waterCount, setWaterCount] = usePersistedState("waterCount", 0)

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div class="p-4">
          <p class="text-base">Glasses drank today</p>
          <p class="text-2xl">{waterCount}</p>
        </div>
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full" onClick={() => setWaterCount(waterCount+1)}>
          Record a gulp
        </button>
      </header>
    </div>
  );
}

export default App;
