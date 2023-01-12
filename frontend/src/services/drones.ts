import axios from 'axios';
import CoordinatesHelper from '../utils/coordinates';
import { XMLParser } from 'fast-xml-parser';
import { BASE_URL, NEST_COORDINATES_X, NEST_COORDINATES_Y, NFZ_RADIUS_METERS } from '../utils/constants';
import { Drone } from '../utils/interfaces';

/**
 * Returns a list of drones which violated the NFZ during the last 10 minutes
 */
const getViolatingDrones = async (): Promise<Drone[]> => {
  return [];
};


export default {
  getViolatingDrones
};
