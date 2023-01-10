import React from "react";
import { Drone } from "../utils/interfaces";

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
            <th>Serial Number</th>
            <th>Closest Distance</th>
          </tr>
        </thead>
        <tbody>
          {props.drones.map((drone) => (
            <tr key={drone.serialNumber}>
              <td>{drone.serialNumber}</td>
              <td>{drone.closestDistance}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DronesTable;