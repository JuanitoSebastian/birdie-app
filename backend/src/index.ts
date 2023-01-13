
import http from 'http';
import app from './app';
import DroneService from './services/drones';
import sanitizedConfig from './utils/config';

const server = http.createServer(app);

server.listen(sanitizedConfig.PORT, () => {
  console.log(`Server running on port ${sanitizedConfig.PORT}`);
  DroneService.startPolling();
});