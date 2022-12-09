import React from 'react';
import './App.css';
import Navbar from './components/navbar';
import usePersistedState from './utils/useCustomStorage';

function App() {

  const [waterCount, setWaterCount] = usePersistedState("waterCount", 0)

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="p-4">
          <p className="text-base">Glasses drank today</p>
          <p className="text-2xl">{waterCount}</p>
        </div>
        <div className="grid grid-flow-col gap-2">
          <button class="bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-4 rounded-full" onClick={() => setWaterCount(waterCount+1)}>
            Record drink
          </button>
          <button class="bg-red-500 hover:bg-red-700 text-white text-lg py-1 px-4 rounded-full" onClick={() => setWaterCount(waterCount-1)}>
            Reduce count
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
