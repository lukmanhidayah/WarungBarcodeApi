const http = require('http')
const app = require('./src/app')

const port = require('./src/config/port')

const server = http.createServer(app)

server.listen(port, () => {
    console.log("App is running on port " + port);
});