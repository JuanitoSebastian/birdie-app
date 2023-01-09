import { useEffect } from "react";
import DroneService from './services/drones';

const App = () => {

  useEffect(() => {
    DroneService.getDrones();
  }, []);

  return (
    <div className="App">
      <p>Hey!</p>
    </div>
  );
}

export default App;
