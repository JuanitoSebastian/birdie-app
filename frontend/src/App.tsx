import { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import DroneService from './services/drones';
import { Drone } from "./utils/interfaces";
import './index.css';

const App = () => {
  const [drones, setDrones] = useState<Drone[] | undefined> ([]);

  useInterval(async () => {
    const fetchedDrones = await DroneService.getViolatingDrones(drones);
    setDrones(fetchedDrones);
    console.log(drones);
  }, 2000);

  return (
    <div className="text-3xl">
      <p>Hey!</p>
    </div>
  );
}

export default App;
