import { useEffect, useState } from 'react';
import { useInterval } from './hooks/useInterval';
import DroneService from './services/drones';
import { Drone } from './utils/interfaces';
import './index.css';
import DronesView from './components/DronesView';

const App = () => {
  const [drones, setDrones] = useState<Drone[]>([]);

  /** Poll drones who have violated the NFZ */
  useInterval(async () => {
    const fetchedDrones = await DroneService.getViolatingDrones();
    setDrones(fetchedDrones);
  }, 2000);

  /** Initial fetch of drones */
  useEffect(() => {
    const fetchDronesFromApi = async () => {
      const fetchedDrones = await DroneService.getViolatingDrones();
      setDrones(fetchedDrones);
    };
    fetchDronesFromApi();
  }, []);

  return (
    <div className='container mx-auto py-6'>
      <div className='flex flex-col gap-4 justify-start'>
        <h1 className='text-2xl font-bold'>NFZ Violations</h1>
        <DronesView drones={drones} />
      </div>
    </div>
  );
}

export default App;
