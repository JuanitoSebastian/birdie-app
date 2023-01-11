export interface Drone {
  serialNumber: string;
  closestDistance: number;
  violations: DroneSighting[];
}

export interface BaseDroneSighting {
  serialNumber: string;
  positionY: number;
  positionX: number;
  timestamp: string;
}

export interface DroneSighting extends BaseDroneSighting {
  distanceToNest: number;
}