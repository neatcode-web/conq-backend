import express from "express";
import bodyParser from "body-parser";
import config from "./config";

const app = express();

app.use(bodyParser.json());
app.set("port", config.port);
//import routes
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
//define routes
app.use("/api/auth", authRoute);
app.use("/api/orders/", orderRoute);
module.exports = app;