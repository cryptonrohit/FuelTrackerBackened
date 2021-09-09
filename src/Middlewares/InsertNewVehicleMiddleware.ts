import { NextFunction, Request, Response } from "express";
import { checkIfDefined } from "../Shared/CommonValidators";

class InsertNewVehicleMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        const vehicleValidationInput = [req.params.id, req.body.vehicleName, req.body.distanceTravelled, req.body.fuelConsumed, req.body.averageMileage];
        const isDefined = checkIfDefined(vehicleValidationInput);
        if (!isDefined) {
            console.log("Input params are either undefined/null/''")
            return;
        }
        next();
    }
}
const insertNewVehicleMiddleware = new InsertNewVehicleMiddleware();
export default insertNewVehicleMiddleware;
