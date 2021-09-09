import { Operation } from "../../../Models/Operation";
import { checkDuplicateKey } from "../../../Shared/CommonValidators";
import { DBErrorCodes } from "../../../Shared/DBErrorCodes";
import db from "../../DBConfiguration";
import { MILEAGE_TIME_SERIES_DATA } from "../../TableNames/tableNames";

class InsertMileage {
    async execute(userId: string, vehicleNumber: string, vehicleName: string, mileage: number, fuelRecharged: number): Promise<Operation> {
        try {
            const dataToInsert = {userId, vehicleNumber, vehicleName, mileage, fuelRecharged, timestamp: new Date()};
            await db.dbConnector
                .insert(dataToInsert)
                .into(MILEAGE_TIME_SERIES_DATA)
                .then(response => response);
            return Operation.Created;    
        } catch (error) {
            if (checkDuplicateKey(DBErrorCodes, error.code)) {
                throw Operation.AlreadyExists;
            }
            if (Object.values(DBErrorCodes).includes(error.code)) {
                throw Operation.BadRequest;
            }
            console.error("[DB] Error inserting Mileage Data. Error: ", error);
            throw Operation.Error;
        }
    }
}
const insertMileage = new InsertMileage();
export default insertMileage;
