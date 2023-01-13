import { Drone } from '../utils/interfaces';
import DroneTableRow from './DronesTableRow';

interface DronesTableProps {
  drones: Drone[] | undefined;
}

const DronesTable = (props: DronesTableProps) => {

  if (!props.drones) { return (<></>); }

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr>
            <th>Pilot</th>
            <th>Serial Number</th>
            <th>Closest Distance (m)</th>
          </tr>
        </thead>
        <tbody>
          {props.drones.map((drone) => (
            <DroneTableRow key={drone.serialNumber} drone={drone} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DronesTable;