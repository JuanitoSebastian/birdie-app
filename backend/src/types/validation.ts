import { BirdnestApiDroneSighting, BirdnestApiDronesResponse } from './interfaces';

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

export const parseBirdnestApiDronesResponse = (birdnestApiDronesResponse: unknown): BirdnestApiDronesResponse => {
  if (!isBirdnestApiDronesResponse(birdnestApiDronesResponse)) {
    throw new Error('Incorrect type, not BirdnestApiDronesResponse');
  }

  return birdnestApiDronesResponse;
};

const isBirdnestApiDronesResponse = (birdnestApiDronesResponse: unknown): birdnestApiDronesResponse is BirdnestApiDronesResponse => {
  if (typeof birdnestApiDronesResponse === 'object' && birdnestApiDronesResponse !== null &&
    'report' in birdnestApiDronesResponse && typeof birdnestApiDronesResponse.report === 'object' &&
    birdnestApiDronesResponse.report !== null && 'capture' in birdnestApiDronesResponse.report &&
    typeof birdnestApiDronesResponse.report.capture === 'object' && birdnestApiDronesResponse.report.capture !== null &&
    'attribute_snapshotTimestamp' in birdnestApiDronesResponse.report.capture &&
    birdnestApiDronesResponse.report.capture.attribute_snapshotTimestamp !== null &&
    typeof birdnestApiDronesResponse.report.capture.attribute_snapshotTimestamp === 'string' &&
    isDate(birdnestApiDronesResponse.report.capture.attribute_snapshotTimestamp) &&
    'drone' in birdnestApiDronesResponse.report.capture && isArray(birdnestApiDronesResponse.report.capture.drone)) {
    for (const droneSighting of birdnestApiDronesResponse.report.capture.drone) {
      if (!isBirdnestApiDroneSighting(droneSighting)) { return false; }
    }
    return true;
  }
  return false;
};

const isBirdnestApiDroneSighting = (birdnestApiDroneSighting: unknown): birdnestApiDroneSighting is BirdnestApiDroneSighting => {
  return typeof birdnestApiDroneSighting === 'object' && birdnestApiDroneSighting !== null &&
    'positionY' in birdnestApiDroneSighting && typeof birdnestApiDroneSighting.positionY === 'number' &&
    'positionX' in birdnestApiDroneSighting && typeof birdnestApiDroneSighting.positionX === 'number' &&
    'serialNumber' in birdnestApiDroneSighting && typeof birdnestApiDroneSighting.serialNumber === 'string';
};