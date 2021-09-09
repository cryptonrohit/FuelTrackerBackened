import insertNewVehicle from "../Database/Entities/Commands/InsertNewVehicle";
import { HttpResponseModel } from "../Models/HttpResponseModel";
import Vehicle from "../Models/Vehicle";
import { APIErrorResponseMapper } from "../Shared/APIErrorResponseMapper";
import { getHttpStatusCode } from "../Shared/getHttpStatusCode";
import httpStatus from "http-status-codes";

class InsertNewVehicleService {
    async execute(vehicleData: Vehicle): Promise<HttpResponseModel> {
        const httpResponse: HttpResponseModel = {};
        try {
            const dbResponse = await insertNewVehicle.execute(vehicleData);
            httpResponse.statusCode = getHttpStatusCode(dbResponse);
            httpResponse.outputData = httpStatus.getStatusText(httpResponse.statusCode);
            return httpResponse;
        } catch (error) {
            const errorResponse = APIErrorResponseMapper(error);
            httpResponse.statusCode = errorResponse.code;
            httpResponse.outputData = errorResponse;
            return httpResponse;
        }
    }
}
const insertNewVehicleService = new InsertNewVehicleService();
export default insertNewVehicleService;
