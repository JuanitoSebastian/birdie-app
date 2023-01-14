import axios, { AxiosResponse } from 'axios';
import sanitizedConfig from '../utils/config';
import { Drone } from '../utils/interfaces';
import { parseDroneArray } from '../utils/validation';

const dronesApiUrl = `${sanitizedConfig.REACT_APP_API_URL}/drones`;

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
