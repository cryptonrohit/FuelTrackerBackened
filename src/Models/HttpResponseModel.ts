import { ObjectDefault } from "./ObjectDefault";

export interface HttpResponseModel {
    outputData?: ObjectDefault | string;
    statusCode?: number;
}