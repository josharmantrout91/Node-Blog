const express = require("express");

const expressRouter = require("./data/express-router");

const server = express();

server.use(express.json());
server.use("/api/", expressRouter);

server.get("/", (req, res) => {
  res.send(`
      <h2>Node Blog</h>
      <p>Welcome to the THUNDERDOME, BABY!!!</p>
    `);
});

module.exports = server;
