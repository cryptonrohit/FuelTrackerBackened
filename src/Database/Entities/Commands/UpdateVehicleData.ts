import { ObjectDefault } from "../../../Models/ObjectDefault";
import { Operation } from "../../../Models/Operation";
import db from "../../DBConfiguration";
import { VEHICLE_DATA } from "../../TableNames/tableNames";

class UpdateVehicleData {
    async execute(userId: string, dataToUpdate: ObjectDefault) {
        try {
            const dbResponse = await db.dbConnector
                .update(dataToUpdate)
                .where({userId})
                .into(VEHICLE_DATA)
                .count("*")
                .then(response => response);
            if (!dbResponse) {
                throw Operation.ObjectDoesNotExist;
            }    
            return Operation.Success;   
        } catch (error) {
            console.log("[DB] Failed to update Vehicle Data. Error: ", error);
            throw Operation.Error;
        }
    }
}
const updateVehicleData = new UpdateVehicleData();
export default updateVehicleData;
