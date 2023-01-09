import axios from "axios";
import { XMLParser } from "fast-xml-parser";
import { BASE_URL } from "../utils/constants";
import { BaseDrone } from "../utils/interfaces";
import { parseBaseDrone, parseUnkownArray } from "../utils/validation";

const dronesBaseUrl = `${BASE_URL}/drones`;
const parser = new XMLParser();

const getDrones = async (): Promise<BaseDrone[]> => {
  const request = await axios.get(dronesBaseUrl);
  const parsed = parser.parse(request.data);
  const rawDroneArray = parseUnkownArray(parsed.report.capture.drone);
  const drones = rawDroneArray.map(drone => parseBaseDrone(drone));
  console.log(drones);
  return [];
};

export default {
  getDrones
};