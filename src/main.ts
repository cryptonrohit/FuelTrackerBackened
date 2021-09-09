import express from "express";
import bodyParser from "body-parser";
export const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
const port = process.env.PORT;
app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
})

async function main() {
    try {
        await dbConfig.init();
        console.log("DB is up.")
    } catch (error) {
        console.error("Issue getting DB up", error);
    }
}

import trackerController from "./Controllers/TrackerController";
import insertNewVehicleMiddleware from "./Middlewares/InsertNewVehicleMiddleware";
import dbConfig from "./Database/DBConfiguration";

app.post("/fuel-Tracker/newVehicle/:id", insertNewVehicleMiddleware.validate, trackerController.insertNewVehicleById);
main();
