import { Operation } from "../../../Models/Operation";
import Vehicle from "../../../Models/Vehicle";
import { checkDuplicateKey } from "../../../Shared/CommonValidators";
import { DBErrorCodes } from "../../../Shared/DBErrorCodes";
import db from "../../DBConfiguration";
import { VEHICLE_DATA } from "../../TableNames/tableNames";

class InsertNewVehicle {
    async execute(vehicleData: Vehicle): Promise<Operation> {
        try {
            await db.dbConnector
                .insert({...vehicleData, registeredOn: new Date()})
                .into(VEHICLE_DATA)
                .then(response => response);
            return Operation.Created;
        } catch (error) {
            if (checkDuplicateKey(DBErrorCodes, error.code)) {
                throw Operation.AlreadyExists;
            }
            if (Object.values(DBErrorCodes).includes(error.code)) {
                throw Operation.BadRequest;
            }
            console.error("[DB] Error inserting vehicleData. Error: ", error);
            throw Operation.Error;
        }
    }
}
const insertNewVehicle = new InsertNewVehicle();
export default insertNewVehicle;
