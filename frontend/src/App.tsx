import { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import DroneService from './services/drones';
import { Drone } from "./utils/interfaces";
import './index.css';
import DronesTable from "./components/DronesTable";

const App = () => {
  const [drones, setDrones] = useState<Drone[] | undefined> ([]);

  useInterval(async () => {
    const fetchedDrones = await DroneService.getViolatingDrones(drones);
    setDrones(fetchedDrones);
    console.log(drones);
  }, 2000);

  return (
    <div className="container mx-auto">
      <p>Hey!</p>
      <button className="btn">Hello daisyUI</button>
      <DronesTable drones={drones} />
    </div>
  );
}

export default App;
