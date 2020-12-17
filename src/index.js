import express from "express";
import apiRouter from "./api/gasStation";

const server = new express();

server.use(express.urlencoded());
server.use(express.json());
server.use("/api/gasStation", apiRouter);

server.listen(7000);
console.log("http://localhost:7000");