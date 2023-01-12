import { useEffect, useState } from 'react';
import { useInterval } from './hooks/useInterval';
import DroneService from './services/drones';
import { Drone } from './utils/interfaces';
import './index.css';
import DronesTable from './components/DronesTable';

const App = () => {
  const [drones, setDrones] = useState<Drone[]>([]);

  useInterval(async () => {
    const fetchedDrones = await DroneService.getViolatingDrones();
    setDrones(fetchedDrones);
  }, 2000);

  useEffect(() => {
    const fetchDronesFromApi = async () => {
      const fetchedDrones = await DroneService.getViolatingDrones();
      setDrones(fetchedDrones);
    };
    fetchDronesFromApi();
  }, []);

  return (
    <div className='container mx-auto'>
      <div className='flex flex-col gap-4 justify-start'>
        <h1 className='text-2xl font-bold'>NFZ Violations</h1>
        <DronesTable drones={drones} />
      </div>
    </div>
  );
}

export default App;
