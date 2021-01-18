const express = require('express');
const server = express();
const cors = require('cors');

server.use(express.json());
server.use(cors());

const router = require('./plot');
server.use('/plot', router);

server.listen(3000, () => console.log("Server started!"));