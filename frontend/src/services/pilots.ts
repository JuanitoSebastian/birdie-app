import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '../utils/constants';
import { Pilot } from '../utils/interfaces';
import { parsePilot } from '../utils/validation';

const pilotsApiUrl = `${BASE_URL}/pilots`;

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