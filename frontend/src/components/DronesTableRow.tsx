import { Drone } from '../utils/interfaces';

interface DronesTableRowProps {
  drone: Drone;
}

const DroneTableRow = (props: DronesTableRowProps) => {

  return (
    <tr>
      <td>{props.drone.serialNumber}</td>
      <td>John Cena</td>
      <td>example@gmail.com</td>
      <td>0453283945</td>
      <td>{props.drone.closestViolation.distanceToNestMeters}</td>
    </tr>
  );
};

export default DroneTableRow;