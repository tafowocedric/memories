const http = require('http');
const app = require('./app');
const db = require('./db_connection');

const port = process.env.PORT || 5000;
const host = process.env.HOST || 'localhost';

const server = http.createServer(app);

db.then(() => {
    server.listen(port, () => console.log(`\nServer started on http://${host}:${port}\n`));
}).catch((error) => console.error(`\nERROR: ${error.message}\n`));
