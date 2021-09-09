import VehicleFuelRecharge from "../Models/VehicleFuelRecharge";
import calculateVehicleData from "../Calculations/calculateVehicleData";
import { HttpResponseModel } from "../Models/HttpResponseModel";
import { APIErrorResponseMapper } from "../Shared/APIErrorResponseMapper";
import { getHttpStatusCode } from "../Shared/getHttpStatusCode";
import httpStatus from "http-status-codes";
import insertMileage from "../Database/Entities/Commands/InsertMileage";
import updateVehicleData from "../Database/Entities/Commands/UpdateVehicleData";

class InsertMileageTimeSeriesService {
    async execute(userId: string, fuelRechargeData: VehicleFuelRecharge) {
        const httpResponse: HttpResponseModel = {};
        try {
            const calculatedData = await calculateVehicleData.calculate(userId, fuelRechargeData);
            const dbResponse = await insertMileage
                .execute(userId, calculatedData.vehicleNumber, calculatedData.vehicleName, calculatedData.mileage, calculatedData.lastRechargedFuel);
            await updateVehicleData.execute(userId, calculatedData.dataToUpdate);
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
const insertMileageTimeSeriesService = new InsertMileageTimeSeriesService();
export default insertMileageTimeSeriesService;
