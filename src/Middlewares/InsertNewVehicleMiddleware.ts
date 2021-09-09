import { NextFunction, Request, Response } from "express";

class InsertNewVehicleMiddleware {
    validate(req: Request, res: Response, next: NextFunction) {
        next();
    }
}
const insertNewVehicleMiddleware = new InsertNewVehicleMiddleware();
export default insertNewVehicleMiddleware;
