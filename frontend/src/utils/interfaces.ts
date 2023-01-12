
export interface Drone {
  serialNumber: string;
  latestViolation: DroneSighting;
  closestViolation: DroneSighting;
}

export interface DroneSighting {
  positionX: number;
  positionY: number;
  timestamp: string;
  distanceToNestMeters: number;
}