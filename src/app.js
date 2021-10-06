import express from "express";
import bodyParser from "body-parser";
const app = express();
import config from "./config";

app.use(bodyParser.json());
app.set("port", config.port);
//import routes
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
//define routes
app.use("/api/auth", authRoute);
app.use("/api/orders/", orderRoute);
module.exports = app;