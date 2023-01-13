import { useEffect, useState } from 'react';
import { Drone, Pilot } from '../utils/interfaces';
import PilotsService from '../services/pilots';

interface DronesTableRowProps {
  drone: Drone;
}

const DroneTableRow = (props: DronesTableRowProps) => {

  const [pilot, setPilot] = useState<Pilot|undefined>(undefined);
  const [pilotLoading, setPilotLoading] = useState<boolean>(true);
  const closestDistanceToNest = Math.round(props.drone.closestViolation.distanceToNestMeters * 100) / 100;

  useEffect(() => {
    const fetchPilot = async () => {
      const pilot = await PilotsService.getPilotOfDrone(props.drone.serialNumber);
      setPilot(pilot);
      setPilotLoading(false);
    };

    fetchPilot();
  }, [props]);

  if (pilotLoading) return (
    <tr>
      <td>
          <div className='flex flex-col items-start justify-center text-sm'>
          </div>
      </td>
      <td>{props.drone.serialNumber}</td>
      <td>{closestDistanceToNest}</td>
    </tr>
  );

  return pilot
  ? (
    <tr>
      <td>
          <div className='flex flex-col items-start justify-center text-sm'>
            <p className='font-bold'>{pilot.firstName} {pilot.lastName}</p>
            <p>{pilot.email}</p>
            <p>{pilot.phoneNumber}</p>
          </div>
      </td>
      <td>{props.drone.serialNumber}</td>
      <td>{closestDistanceToNest}</td>
    </tr>
  )
  : (
    <tr>
      <td>
          <div className='flex flex-col items-start justify-center text-sm'>
            <p className='font-bold'>Unkown pilot</p>
          </div>
      </td>
      <td>{props.drone.serialNumber}</td>
      <td>{closestDistanceToNest}</td>
    </tr>
  );
};

export default DroneTableRow;