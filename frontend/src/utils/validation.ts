import { Drone, DroneSighting, Pilot } from './interfaces';

const isArray = (array: unknown): array is [] => {
  return Array.isArray(array);
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

export const parseString = (text: unknown): string => {
  if (!text || !isString(text)) {
    throw new Error('Incorrect type, not string');
  }

  return text;
};

export const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  }

  return date;
};

export const parseUnkownArray = (unknown: unknown): unknown[] => {
  if (!isArray(unknown)) {
    throw new Error('Incorrect type, not array');
  }
  return unknown;
};

const isNumber = (num: unknown): num is number => {
  return typeof num === 'number' || num instanceof Number;
};

export const parseNumber = (numberToParse: unknown): number => {
  if (!numberToParse || !isNumber(numberToParse)) {
    throw new Error('Incorrect type, not a number');
  }

  return numberToParse;
};

export const parseDrone = (drone: unknown): Drone => {
  if (!drone || !isDrone(drone)) {
    throw new Error('Incorrect type, not a drone');
  }

  return drone;
};

export const parseDroneArray = (droneArray: unknown): Drone[] => {
  if (!droneArray || !isArray(droneArray)) {
    throw new Error('Incorrect type, not a array of drones');
  }

  droneArray.forEach((drone) => {
    if (!drone || !isDrone(drone)) {
      throw new Error('Incorrect type, not a array of drones');
    }
  });

  return droneArray;
}

const isDroneSighting = (droneSighting: unknown): droneSighting is DroneSighting => {
  return typeof droneSighting === 'object' && droneSighting !== null &&
  'positionX' in droneSighting && typeof droneSighting.positionX === 'number' &&
  'positionY' in droneSighting && typeof droneSighting.positionY === 'number' &&
  'timestamp' in droneSighting && typeof droneSighting.timestamp === 'string' && isDate(droneSighting.timestamp) &&
  'distanceToNestMeters' in droneSighting && typeof droneSighting.distanceToNestMeters === 'number';
};

const isDrone = (drone: unknown): drone is Drone => {
  return typeof drone === 'object' && drone !== null &&
  'latestViolation' in drone && isDroneSighting(drone.latestViolation) &&
  'closestViolation' in drone && isDroneSighting(drone.closestViolation);
};

const isPilot = (pilot: unknown): pilot is Pilot => {
  return typeof pilot === 'object' && pilot !== null &&
  'pilotId' in pilot && typeof pilot.pilotId === 'string' &&
  'firstName' in pilot && typeof pilot.firstName === 'string' &&
  'lastName' in pilot && typeof pilot.lastName === 'string' &&
  'phoneNumber' in pilot && typeof pilot.phoneNumber === 'string' &&
  'email' in pilot && typeof pilot.email == 'string';
};

export const parsePilot = (pilot: unknown): Pilot => {
  if (!pilot || !isPilot(pilot)) {
    throw new Error('Incorrect type, not a Pilot');
  }

  return pilot;
};