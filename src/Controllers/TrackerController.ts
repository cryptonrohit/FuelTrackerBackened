import { Request, Response } from "express";
import Vehicle from "../Models/Vehicle";
import VehicleFuelRecharge from "../Models/VehicleFuelRecharge";
import insertNewVehicleService from "../Services/InsertNewVehicleService";
import insertMileageTimeSeriesService from "../Services/InsertMileageTimeSeriesService";

class TrackerController {
    async insertNewVehicleById(req: Request, res: Response) {
        const vehicleData = new Vehicle(req.params.id, req.body.vehicleNumber, req.body.vehicleName, req.body.distanceTravelled,
            req.body.fuelConsumed, req.body.fuelExpense, req.body.lastRechargedFuel, req.body.lastMileage);
        const result = await insertNewVehicleService.execute(vehicleData);
        res.status(result.statusCode).send(result.outputData);
    }

    async insertMileageTimeSeriesData(req: Request, res: Response) {
        const fuelRechargeData = new VehicleFuelRecharge(req.body.currentMeterReading, req.body.currentFuelRecharged, req.body.currentFuelExpense);
        const result = await insertMileageTimeSeriesService.execute(req.params.id, fuelRechargeData);
        res.status(result.statusCode).send(result.outputData);
    }
}
const trackerController = new TrackerController();
export default trackerController; 