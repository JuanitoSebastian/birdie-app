import axios, { AxiosError, AxiosResponse } from 'axios';
import { XMLParser } from 'fast-xml-parser';
import { setIntervalAsync, clearIntervalAsync, SetIntervalAsyncTimer } from 'set-interval-async';

import CoordinatesHelper from '../utils/coordinates';
import { BaseDroneSighting, BirdnestApiDronesResponse, Drone, DroneDictionary, DroneSighting } from '../utils/interfaces';
import { parseBirdnestApiDronesResponse, parseString } from '../utils/validation';
import { NEST_COORDINATES_X, NEST_COORDINATES_Y, NFZ_RADIUS_METERS, NFZ_VIOLATION_TIMELIMT_SECONDS, POLLING_INTERVAL_MILLISECONDS } from '../utils/constants';
import sanitizedConfig from '../utils/config';

let timer: SetIntervalAsyncTimer<unknown[]>;
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: 'attribute_' });
const dronesBaseUrl = `${sanitizedConfig.BIRDNEST_API_URL}/drones`;

let drones: DroneDictionary = {};

/**
 * Starts polling the Birdnest API for drone sightings
 */
const startPolling = () => {
  console.log('Start polling');
  timer = setIntervalAsync(async () => {
    await updateDrones();
  }, POLLING_INTERVAL_MILLISECONDS);
};

/**
 * Stops polling the Birdnest API for drone sightings
 */
const stopPolling = () => {
  console.log('Stop polling');
  void clearIntervalAsync(timer);
};

/**
 * Returns the Drones that have violated NFZ during the set timelimit (set in constants.ts).
 * @returns A list of Drones
 */
const getDrones = (): Drone[] => {
  const dronesArray = Object.values(drones);
  return dronesArray;
};

/**
 * Updates drones dictionary with latest sightings from Birdnest API and old sightings.
 */
const updateDrones = async () => {
  try {
    const apiReponse = await getDroneSightingsFromApi();
    const sightingsFromApi = birdnestApiResponseToBaseDroneSightings(apiReponse);
    const violations = sightingsFromApi.filter(sighting => sighting.distanceToNestMeters < NFZ_RADIUS_METERS);
    drones = updateDronesWithViolations(drones, violations);
    drones = removeDronesWithSightingsOlderThan(drones, NFZ_VIOLATION_TIMELIMT_SECONDS);
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === 429) {
      console.log('HTTP 429 - Pause polling for 5 seconds');
      stopPolling();
      setTimeout(() => { 
        startPolling();
      }, 5000);
    }
  }
};

/**
 * Updates a DroneDictionary with given DroneSightings
 * @param drones DroneDictionary to update
 * @param sightings New sightings to update with
 * @returns 
 */
const updateDronesWithViolations = (drones: DroneDictionary, sightings: BaseDroneSighting[]): DroneDictionary => {
  for (const baseDroneSighting of sightings) {
    if (!baseDroneSighting.serialNumber) { continue; }
    const serialNumber = baseDroneSighting.serialNumber;
    delete baseDroneSighting.serialNumber;

    const drone = drones[serialNumber];
    if (drone) {
      drone.latestViolation = baseDroneSighting as DroneSighting;
      drone.closestViolation = drone.closestViolation.distanceToNestMeters < baseDroneSighting.distanceToNestMeters
        ? drone.closestViolation
        : baseDroneSighting as DroneSighting;
      drones[drone.serialNumber] = drone;
      continue;
    }

    const newDrone: Drone = {
      serialNumber: serialNumber,
      latestViolation: baseDroneSighting as DroneSighting,
      closestViolation: baseDroneSighting as DroneSighting
    };
    drones[serialNumber] = newDrone;
  }

  return drones;
};

/**
 * Removes drones where the latest sighting is older than the given timelimit
 * @param drones DroneDictionary from which to remove drones from
 * @param timelimitSeconds Timelimit in seconds
 * @returns 
 */
const removeDronesWithSightingsOlderThan = (drones: DroneDictionary, timelimitSeconds: number) => {
  const dronesArray = Object.values(drones);
  for (const drone of dronesArray) {
    const latestViolationDate = new Date(drone.latestViolation.timestamp);
    if ((Math.abs(latestViolationDate.getTime() - Date.now()) / 1000) < timelimitSeconds) { continue; }
    delete drones[drone.serialNumber];
  }
  return drones;
};

/**
 * Converts the Birdnest API reponse to an array of BaseDroneSightings
 * @param birdnestApiDronesReponse Reponse from Birdnest API
 * @returns Array of BaseDroneSighting
 */
const birdnestApiResponseToBaseDroneSightings = (birdnestApiDronesReponse: BirdnestApiDronesResponse): BaseDroneSighting[] => {
  const sightingsFromApi = birdnestApiDronesReponse.report.capture.drone;
  const droneSightings: BaseDroneSighting[] = sightingsFromApi.map((sighting) => {
    return {
      positionX: sighting.positionX,
      positionY: sighting.positionY,
      serialNumber: sighting.serialNumber,
      timestamp: birdnestApiDronesReponse.report.capture.attribute_snapshotTimestamp,
      distanceToNestMeters: CoordinatesHelper.distanceBetweenCoordinates(
        sighting.positionX,
        sighting.positionY,
        NEST_COORDINATES_X,
        NEST_COORDINATES_Y
      ) / 1000
    };
  });
  return droneSightings;
};

/**
 * Fetches latest drone sightings from Birdnest API
 * @returns BirdnestApiDronesResponse parsed from XML reponse
 */
const getDroneSightingsFromApi = async (): Promise<BirdnestApiDronesResponse> => {
  const droneSightings: AxiosResponse<unknown, unknown> = await axios.get(dronesBaseUrl);
  const droneSightingsXmlString = parseString(droneSightings.data);
  const unsanitizedDroneSightings: unknown = parser.parse(droneSightingsXmlString);
  const parsedDroneSightintgs = parseBirdnestApiDronesResponse(unsanitizedDroneSightings);
  return parsedDroneSightintgs;
};

export default {
  startPolling,
  stopPolling,
  getDrones
};