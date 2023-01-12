
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

export interface Pilot {
  pilotId: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  email: string;
}