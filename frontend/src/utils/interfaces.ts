
export interface BaseDrone {
  serialNumber: string;
  positionY: number;
  positionX: number;
}

export interface Drone extends BaseDrone {
  closestDistance: number;
  lastViolation: Date;
}