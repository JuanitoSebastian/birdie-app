
import http from 'http';
import app from './app';

const server = http.createServer(app);

server.listen(3001, () => {
  console.log(`Server running on port 3001`);
});