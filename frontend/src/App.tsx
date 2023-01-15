import { useEffect, useState } from 'react';
import { useInterval } from './hooks/useInterval';
import DroneService from './services/drones';
import { Drone } from './utils/interfaces';
import './index.css';
import DronesView from './components/DronesView';
import Footer from './components/Footer';

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
    <div className='flex flex-col min-h-screen h-auto justify-between'>
      <div className='container mx-auto py-6'>
        <div className='flex flex-col gap-4 justify-start'>
          <h1 className='text-2xl font-bold'>NDZ Violations 🦅</h1>
          <DronesView drones={drones} />
        </div>
      </div>
      <div className='flex-grow'></div>
      <Footer />
    </div>
  );
}

export default App;
