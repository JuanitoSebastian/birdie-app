import { useEffect, useState } from 'react';
import { Drone, Pilot } from '../utils/interfaces';
import PilotsService from '../services/pilots';
import Icon from './Icon';

interface DroneCardProps {
  drone: Drone;
}

const DroneCard = (props: DroneCardProps) => {

  const [pilot, setPilot] = useState<Pilot | undefined>(undefined);
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

  if (pilotLoading) return (<></>);

  return pilot
    ? (
      <div className="card card-compact bg-base-100 shadow-xl">
        <div className='card-body'>
          <p className='card-title'>{pilot.firstName} {pilot.lastName}</p>
          <div className='flex flex-row gap-2 items-center'>
            <Icon type='email' />
            <p>{pilot.email}</p>
          </div>
          <div className='flex flex-row gap-2 items-center'>
            <Icon type='phone' />
            <p>{pilot.phoneNumber}</p>
          </div>
          <div className='flex flex-col gap-0 items-end'>
            <p className='font-mono text-xs'>Closest Violation</p>
            <p className='font-bold text-lg'>{closestDistanceToNest} m</p>
          </div>
        </div>
      </div>
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

export default DroneCard;