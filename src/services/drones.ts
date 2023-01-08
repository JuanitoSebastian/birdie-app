import axios from "axios";
import { BASE_URL } from "../utils/constants";

const dronesBaseUrl = `${BASE_URL}/drones`;
const config = {
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
  }
};

const getDrones = async (): Promise<undefined> => {
  const request = axios.get(dronesBaseUrl, config);
  (await request).headers.set
  console.log('moi');
  console.log(request);
  return undefined;
};

export default {
  getDrones
};