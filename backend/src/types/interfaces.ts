export interface Drone {
  serialNumber: string;
  latestViolation: DroneSighting;
  closestViolation: DroneSighting;
}

export interface BaseDroneSighting {
  serialNumber: string;
  positionY: number;
  positionX: number;
  timestamp: string;
  distanceToNestMeters: number;
}

export type DroneSighting = Omit<BaseDroneSighting, 'serialNumber'>;
export type BirdnestApiDroneSighting = Omit<BaseDroneSighting, 'timestamp'|'distanceToNest'>;

export interface BirdnestApiDronesResponse {
  report: {
    capture: {
      drone: BirdnestApiDroneSighting[],
      attribute_snapshotTimestamp: string;
    }
  } 
}

export interface DroneDictionary {
  [serialNumber: string]: Drone;
}