import axios from 'axios';
import CoordinatesHelper from '../utils/coordinates';
import { XMLParser } from 'fast-xml-parser';
import { BASE_URL, NEST_COORDINATES_X, NEST_COORDINATES_Y, NFZ_RADIUS_METERS } from '../utils/constants';
import { Drone, DroneSighting } from '../utils/interfaces';
import { parseDate, parseDroneSighting, parseUnkownArray } from '../utils/validation';

const dronesBaseUrl = `${BASE_URL}/drones`;
const parser = new XMLParser({ ignoreAttributes: false, attributeNamePrefix: 'attribute_' });

/**
 * Returns a list of drones which violated the NFZ during the last 10 minutes
 * @param drones: A list of drones to update and append new sightings to
 */
const getViolatingDrones = async (drones: Drone[] = []): Promise<Drone[]> => {
  const droneSightings = await getSightings();
  const violatingSighting = droneSightings.filter(sighting => sighting.distanceToNest <= NFZ_RADIUS_METERS);
  const updatedDrones = updateDronesWithSightings(violatingSighting, drones);
  const dronesWithOldSightingsRemoved = removeDronesWithSightingsOlderThan(600, updatedDrones);
  return dronesWithOldSightingsRemoved;
};

/**
 * Fetches and parses drone sightings from drone api. Calculates the distance from nest for each sighting.
 * @returns Current drone sightings
 */
const getSightings = async (): Promise<DroneSighting[]> => {
  const request = await axios.get(dronesBaseUrl);
  const parsed = parser.parse(request.data);
  const rawDroneSightingArray = parseUnkownArray(parsed.report.capture.drone);
  const timestamp = parseDate(parsed.report.capture.attribute_snapshotTimestamp);
  const baseDroneSightings = rawDroneSightingArray.map(drone => parseDroneSighting(drone, timestamp));
  const droneSightings = baseDroneSightings.map((sighting) => {
    const droneSighting: DroneSighting = {
      ...sighting,
      distanceToNest: CoordinatesHelper.distanceBetweenCoordinates(
        sighting.positionX,
        sighting.positionY,
        NEST_COORDINATES_X,
        NEST_COORDINATES_Y
      )
    };
    return droneSighting;
  });
  return droneSightings;
};

/**
 * Updates list of drones with given sightings. If drone exists, it is updated and a new sighting
 * is added to list o violations. New drone is created when necessary.
 * @param sightings A list of DroneSightings
 * @param drones: A list of drones where to append / update
 */
const updateDronesWithSightings = (sightings: DroneSighting[], drones: Drone[]): Drone[] => {
  for (const sighting of sightings) {
    const droneToUpdate = drones.find(drone => drone.serialNumber === sighting.serialNumber);
    if (droneToUpdate) {
      droneToUpdate.violations = [...droneToUpdate.violations, sighting];
      droneToUpdate.closestDistance = droneToUpdate.closestDistance > sighting.distanceToNest
        ? droneToUpdate.closestDistance
        : sighting.distanceToNest;
      continue;
    }
    const newDrone: Drone = {
      serialNumber: sighting.serialNumber,
      closestDistance: sighting.distanceToNest,
      violations: [sighting]
    };
    drones.push(newDrone);
  }
  return drones;
};

/**
 * Removes drones from a provided list where the last sighting is older than given amount of seconds
 * @param seconds Drones with sightings older than this will be removed
 * @param drones List to filter
 */
const removeDronesWithSightingsOlderThan = (seconds: number, drones: Drone[]): Drone[] => {
  const filteredDrones = drones.filter((drone) => {
    if (drone.violations.length === 0) { return false; }
    const lastViolationDate = new Date(drone.violations[drone.violations.length - 1].timestamp);
    return (Math.abs(lastViolationDate.getTime() - Date.now()) / 1000) < seconds; 
  })
  return filteredDrones;
};

export default {
  getViolatingDrones
};
