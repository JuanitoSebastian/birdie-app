import { Drone } from '../utils/interfaces';

interface DronesTableRowProps {
  drone: Drone;
}

const DroneTableRow = (props: DronesTableRowProps) => {

  const distanceInMeters = Math.round(props.drone.closestDistance / 10) / 100;

  return (
    <tr>
      <td>{props.drone.serialNumber}</td>
      <td>John Cena</td>
      <td>example@gmail.com</td>
      <td>0453283945</td>
      <td>{distanceInMeters}</td>
    </tr>
  );
};

export default DroneTableRow;