import { NextFunction, Request, Response } from "express";
import { checkIfDefined } from "../Shared/CommonValidators";

class InsertVehicleMileageMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        const vehicleValidationInput = [req.params.id, req.body.currentMeterReading, req.body.fuelRecharged, req.body.fuelExpense];
        const isDefined = checkIfDefined(vehicleValidationInput);
        if (!isDefined) {
            console.log("Input params are either undefined/null/''")
            return;
        }
        next();
    }
}
const insertVehicleMileageMiddleware = new InsertVehicleMileageMiddleware();
export default insertVehicleMileageMiddleware;
