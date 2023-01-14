import axios, { AxiosError, AxiosResponse } from 'axios';
import sanitizedConfig from '../utils/config';
import { Pilot } from '../utils/interfaces';
import { parsePilot } from '../utils/validation';

const pilotsApiUrl = `${sanitizedConfig.REACT_APP_API_URL}/pilots`;

/**
 * Returns the pilot of a given drone
 * @param droneSerialNumber Serial Number of drone
 * @returns On success: Pilot. On failure (pilot not found): undefined
 */
const getPilotOfDrone = async (droneSerialNumber: string): Promise<Pilot | undefined> => {
  try {
    const apiResponse: AxiosResponse<unknown, unknown> = await axios.get(`${pilotsApiUrl}/${droneSerialNumber}`);
    const user = parsePilot(apiResponse.data);
    return user;
  } catch (error) {
    if (error instanceof AxiosError && error.response && error.response.status === 404) {
      return undefined;
    }
  }
};

export default {
  getPilotOfDrone
};