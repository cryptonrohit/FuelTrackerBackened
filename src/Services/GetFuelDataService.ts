import getVehicleFuelData from "../Database/Entities/Query/GetVehicleFuelData";
import { HttpResponseModel } from "../Models/HttpResponseModel";
import { getHttpStatusCode } from "../Shared/getHttpStatusCode";
import { APIErrorResponseMapper } from "../Shared/APIErrorResponseMapper";

class GetFuelDataService {
    async execute(userId: string): Promise<HttpResponseModel> {
        const httpResponse: HttpResponseModel = {};
        try {
            const dbResponse = await getVehicleFuelData.get(userId);
            httpResponse.statusCode = getHttpStatusCode(dbResponse.operation);
            httpResponse.outputData = dbResponse.data;
            return httpResponse;
        } catch (error) {
            const errorResponse = APIErrorResponseMapper(error.operation);
            httpResponse.statusCode = errorResponse.code;
            httpResponse.outputData = errorResponse;
            return httpResponse;
        }
    }
}
const getFuelDataService = new GetFuelDataService();
export default getFuelDataService;
