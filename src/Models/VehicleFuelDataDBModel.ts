import { Operation } from "./Operation";
import Vehicle from "./Vehicle";

export interface VehicleFuelDataDBModel {
    data?: Vehicle[],
    operation: Operation
}