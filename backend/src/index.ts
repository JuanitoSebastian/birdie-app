
import http from 'http';
import app from './app';
import DroneService from './services/drones';

const server = http.createServer(app);

server.listen(3001, () => {
  console.log(`Server running on port 3001`);
  DroneService.startPolling();
});