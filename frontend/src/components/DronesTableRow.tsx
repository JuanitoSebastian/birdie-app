import { Drone } from '../utils/interfaces';

interface DronesTableRowProps {
  drone: Drone;
}

const DroneTableRow = (props: DronesTableRowProps) => {

  const closestDistanceToNest = Math.round(props.drone.closestViolation.distanceToNestMeters * 100) / 100;

  return (
    <tr>
      <td>{props.drone.serialNumber}</td>
      <td>
          <div className='flex flex-col items-start justify-center text-sm'>
            <p className='font-bold'>John Cena</p>
            <p>example@gmail.com</p>
            <p>0453283945</p>
          </div>
      </td>
      <td>{closestDistanceToNest}</td>
    </tr>
  );
};

export default DroneTableRow;