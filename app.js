const {createServer } = require('http');
require('dotenv').config();
const hostName = '127.0.0.1';
const port = process.env.PORT || 3000;

const server = createServer((req,res) =>{
    res.statusCode = 200;
    res.setHeader('Content-Type','text/plain');
    res.end('Hello World PM2 installed');
});

server.listen(port,hostName, () => {
    console.log(`Server running at http://${hostName}:${port}`);
});