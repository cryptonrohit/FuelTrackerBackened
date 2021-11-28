import express from "express";
import bodyParser from "body-parser";
export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const port = 3008;
app.listen(port, ()=> {
    console.log(`listening on port 3008`);
})

async function main() {
    try {
        await dbConfig.init();
        console.log("DB is up.")
        rabbbitMQInit();
        console.log("MessageQ setup is OK.")
    } catch (error) {
        console.error("Issue getting DB up", error);
    }
}

import trackerController from "./Controllers/TrackerController";
import insertNewVehicleMiddleware from "./Middlewares/InsertNewVehicleMiddleware";
import insertVehicleMileageMiddleware from "./Middlewares/InsertVehicleMileageMiddleware";
import dbConfig from "./Database/DBConfiguration";
import { rabbbitMQInit } from "./RabbitMQ/MessageQ";

app.post("/fuel-Tracker/newVehicle/:id", insertNewVehicleMiddleware.validate, trackerController.insertNewVehicleById);
app.post("/fuel-Tracker/mileage/:id", insertVehicleMileageMiddleware.validate, trackerController.insertMileageTimeSeriesData);
main();
