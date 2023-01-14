import { Drone } from '../utils/interfaces';
import DroneCard from './DroneCard';

interface DronesViewProps {
  drones: Drone[] | undefined;
}

/**
 * A view displaying DroneCards using a responsive grid.
 * @param props DronesViewProps including an array of Drone objects
 */
const DronesView = (props: DronesViewProps) => {

  if (!props.drones) return (<></>);

  return (
    <div className='grid grid-cols-1 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 gap-4'>
      {props.drones.map((drone) => (
            <DroneCard key={drone.serialNumber} drone={drone} />
          ))}
    </div>
  );
};

export default DronesView;