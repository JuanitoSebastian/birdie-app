import { Drone } from '../utils/interfaces';
import DroneTableRow from './DronesTableRow';

interface DronesTableProps {
  drones: Drone[] | undefined;
}

const DronesTable = (props: DronesTableProps) => {

  if (!props.drones) { return (<></>); }

  return (
    <div className="overflow-x-auto">
      <table className="table table-compact w-full">
        <thead>
          <tr>
            <th>Serial Number</th>
            <th>Owner</th>
            <th>Email</th>
            <th>Phone</th>
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