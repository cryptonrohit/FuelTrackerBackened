import { Request, Response } from "express";
import Vehicle from "../Models/Vehicle";
import insertNewVehicleService from "../Services/InsertNewVehicleService";

class TrackerController {
    async insertNewVehicleById(req: Request, res: Response) {
        const vehicleData = new Vehicle(req.params.id, req.body.vehicleNumber, req.body.vehicleName, req.body.distanceTravelled,
            req.body.fuelConsumed, req.body.fuelExpense, req.body.lastRechargedFuel, req.body.lastMileage);
        const result = await insertNewVehicleService.execute(vehicleData);
        res.status(result.statusCode).send(result.outputData);
    }
}
const trackerController = new TrackerController();
export default trackerController; 