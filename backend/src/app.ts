import express, { NextFunction, Request, RequestHandler, Response } from 'express';
import cors from 'cors';
import axios from 'axios';

import DroneService from './services/drones';

const app = express();

app.use(cors());
app.use(express.json());

const baseUrl = 'https://assignments.reaktor.com/birdnest';

/**
 * Returns drones within 100m^2 of nest
 */
app.get('/drones', ((_request: Request, response: Response, _next: NextFunction) => {
  response.send(DroneService.getDrones());
}) as RequestHandler);

/**
 * Returns pilot by given serial number. If serial number is invalid, 404 is sent.
 */
app.get('/pilots/:serialNumber', (async (request: Request, response: Response, next: NextFunction) => {
  const serialNumber = request.params.serialNumber;
  try {
    const dronesRequest = await axios.get(`${baseUrl}/pilots/${serialNumber}`);
    response.send(dronesRequest.data);
  } catch (error) {
    next();
  } 

}) as RequestHandler);

/**
 * Catch unkown endpoints and send 404.
 */
const unknownEndPoint = (_request: Request, response: Response) => {
  response.status(404).send({ error: 'Unkown endpoint' });
};

app.use(unknownEndPoint);

export default app;