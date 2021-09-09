import httpStatus from "http-status-codes";
import { Operation } from "../Models/Operation";
export function getHttpStatusCode(operation: Operation) {
    switch (operation) {
        case Operation.Success:
            return httpStatus.OK;
        case Operation.AlreadyExists:
            return httpStatus.CONFLICT;
        case Operation.Created:
            return httpStatus.CREATED;
        case Operation.Error:
            return httpStatus.INTERNAL_SERVER_ERROR;       
        default:
            return httpStatus.BAD_REQUEST;
    }
}