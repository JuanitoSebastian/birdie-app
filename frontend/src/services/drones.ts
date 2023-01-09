import axios from "axios";
import { BASE_URL } from "../utils/constants";

const dronesBaseUrl = `${BASE_URL}/drones`;
const getDrones = async (): Promise<undefined> => {
  const request = await axios.get(dronesBaseUrl);
  console.log(request);
  return undefined;
};

export default {
  getDrones
};