import React, { useEffect, useState } from 'react';
import './App.css';
import Navbar from './components/navbar';
import {get, set} from 'idb-keyval';
// import usePersistedState from './utils/useCustomStorage';

function App() {

  const [waterTracker, setWaterTracker] = useState(undefined)
  const [date_id, setDateId] = useState(undefined)

  useEffect(() => {
    // get todays date
    async function getTrackingInfo() {
      const d = new Date();
      const date_id = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` 
      setDateId(date_id)
      // get todays counter
      const waterTrackerInfo = await get('waterTracker')
      setWaterTracker(waterTrackerInfo)
      if (waterTrackerInfo === undefined) {
        await set('waterTracker', {})
        setWaterTracker({})
      }
      if (!(date_id in waterTrackerInfo)) {
        await set('waterTracker', {...waterTrackerInfo, [date_id]: 0})
        setWaterTracker({...waterTrackerInfo, [date_id]: 0})
      }
    }
    getTrackingInfo()
    // console.log(waterTracker)

    // get historical counter
  }, [])

  const recordWaterIntake = async () => {
    const d = new Date();
    const date_id = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    const updatedWaterTracker = {...waterTracker, [date_id]: waterTracker[date_id] + 1}
    // console.log(updatedWaterTracker)
    setWaterTracker(updatedWaterTracker)
    await set('waterTracker', updatedWaterTracker)
  }

  const reducedWaterIntake = async () => {
    const d = new Date();
    const date_id = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}`
    const updatedWaterTracker = {...waterTracker, [date_id]: Math.max(waterTracker[date_id] - 1, 0)}
    // console.log(updatedWaterTracker)
    setWaterTracker(updatedWaterTracker)
    await set('waterTracker', updatedWaterTracker)
  }

  return (
    <div className="App">
      <Navbar />
      <header className="App-header">
        <div className="p-4">
          <p className="text-base">Glasses drank today</p>
          <p className="text-2xl">{waterTracker === undefined || date_id === undefined ? 0 : waterTracker[date_id]}</p>
        </div>
        <div className="grid grid-flow-col gap-2">
          <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-4 rounded-full" onClick={() => recordWaterIntake()}>
            Record drink
          </button>
          <button className="bg-red-500 hover:bg-red-700 text-white text-lg py-1 px-4 rounded-full" onClick={() => reducedWaterIntake()}>
            Reduce count
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
