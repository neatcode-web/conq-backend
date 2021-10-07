import express from "express";
import bodyParser from "body-parser";
import config from "./config";
import { verifyAccessToken } from "./middleware/authMiddleware"
import { error } from "./responseApi";
const app = express();

app.use(bodyParser.json());
app.set("port", config.port);
//import routes
const authRoute = require('./routes/auth');
const orderRoute = require('./routes/order');
//define routes
  
app.use((err, req, res, next) => {
    res.send( error(err.message, err.status || 500) )
})
app.use("/api/auth", authRoute);
app.use("/api/orders/", orderRoute);
module.exports = app;