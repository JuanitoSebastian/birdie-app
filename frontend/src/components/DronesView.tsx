import { Drone } from '../utils/interfaces';
import DroneCard from './DroneCard';

interface DronesViewProps {
  drones: Drone[] | undefined;
}

const DronesView = (props: DronesViewProps) => {

  if (!props.drones) return (<></>);

  return (
    <div className='grid grid-cols-4 gap-4'>
      {props.drones.map((drone) => (
            <DroneCard key={drone.serialNumber} drone={drone} />
          ))}
    </div>
  );
};

export default DronesView;