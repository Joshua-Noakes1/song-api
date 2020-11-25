console.clear()
console.log('Loading...')
// Loading all the required stuff for an nodejs http server
const http = require('http');
const app = require('./app');
// || = default if env.port doesnt exist
const port = process.env.port || 3001;
// starting express
const server = http.createServer(app);
server.listen(port);

console.log(`Started http server on port ${port}`);