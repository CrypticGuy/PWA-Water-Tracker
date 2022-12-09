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
    (async () => {
      const d = new Date();
      const date_id = `${d.getFullYear()}-${d.getMonth()+1}-${d.getDate()}` 
      setDateId(date_id)
      // get todays counter
      let waterTrackerInfo;
      waterTrackerInfo = await get('waterTracker')
      setWaterTracker(waterTrackerInfo)
      if (waterTrackerInfo === undefined) {
        await set('waterTracker', {})
        setWaterTracker({})
      }
      if (!(date_id in waterTrackerInfo)) {
        await set('waterTracker', {...waterTrackerInfo, [date_id]: 0})
        setWaterTracker({...waterTrackerInfo, [date_id]: 0})
      }
    })()
    // console.log(Object.keys(waterTracker).map((key, index) => console.log(key, index, waterTracker[key])))
    // console.log(waterTracker)
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
        <div className="h-full">
          <div className="p-4">
            <p className="text-base">Glasses drank today</p>
            <p className="text-2xl">{waterTracker === undefined || date_id === undefined ? 0 : waterTracker[date_id]}</p>
          </div>
          <div className="grid grid-flow-col gap-2">
            <button className="bg-red-500 hover:bg-red-700 text-white text-lg py-1 px-4 rounded-full" onClick={() => reducedWaterIntake()}>
              Reduce count
            </button>
            <button className="bg-blue-500 hover:bg-blue-700 text-white text-lg py-1 px-4 rounded-full" onClick={() => recordWaterIntake()}>
              Record drink
            </button>
          </div>
        </div>
      </header>
      <main className='p-6 my-8'>
        <p className='text-xl text-white p-2'>Past tracker</p>
        <table class="w-full text-left text-gray-500 dark:text-gray-400">
        <thead class="table-header-group text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <div class="table-row">
            <div class="table-cell text-center">Date</div>
            <div class="table-cell text-center">Water Intake</div>
          </div>
        </thead>
        <div class="table-row-group">
          {
            waterTracker === undefined ? <p className="text-white">Fetching records</p> :
              // Object.keys(waterTracker)
              Object.keys(waterTracker).map((key, index) =>
                 (
                  <div className="table-row bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={index}>
                    <div class="table-cell text-center py-2 px-6 font-medium text-gray-90a0 whitespace-nowrap dark:text-white">{key}</div>
                    <div class="table-cell text-center">{waterTracker[key]}</div>
                  </div>
                )
              )  
          }
        </div>
      </table>
      </main>
    </div>
  );
}

export default App;
