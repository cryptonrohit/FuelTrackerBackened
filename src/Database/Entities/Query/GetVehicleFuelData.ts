import { Operation } from "../../../Models/Operation";
import { VehicleFuelDataDBModel } from "../../../Models/VehicleFuelDataDBModel";
import db from "../../DBConfiguration";
import { VEHICLE_DATA } from "../../TableNames/tableNames";

class GetVehicleFuelData {
    async get(userId: string): Promise<VehicleFuelDataDBModel> {
        try {
            let dbResponse = await db.dbConnector
                .select("*")
                .from(VEHICLE_DATA)
                .where({userId})
                .then(response => response);
            if (!dbResponse && !dbResponse.length) {
                throw { operation: Operation.ObjectDoesNotExist }
            }  
            return { data: dbResponse, operation: Operation.Success };
        } catch (error) {
            throw { opeartion: Operation.Error };
        }            
    }
}
const getVehicleFuelData = new GetVehicleFuelData();
export default getVehicleFuelData;
