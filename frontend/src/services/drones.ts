import axios, { AxiosResponse } from 'axios';
import { BASE_URL } from '../utils/constants';
import { Drone } from '../utils/interfaces';
import { parseDroneArray } from '../utils/validation';

const dronesApiUrl = `${BASE_URL}/drones`;

/**
 * Returns a list of drones which violated the NFZ during the last 10 minutes
 */
const getViolatingDrones = async (): Promise<Drone[]> => {
  const dronesFromApi: AxiosResponse<unknown, unknown> = await axios.get(dronesApiUrl);
  const drones = parseDroneArray(dronesFromApi.data);
  return drones;
};


export default {
  getViolatingDrones
};
