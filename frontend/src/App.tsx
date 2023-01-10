import { useEffect } from "react";
import DroneService from './services/drones';

const App = () => {

  useEffect(() => {
    const drones = DroneService.getViolatingDrones();
    console.log(drones);
  }, []);

  return (
    <div className="App">
      <p>Hey!</p>
    </div>
  );
}

export default App;
