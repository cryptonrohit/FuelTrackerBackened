import { Operation } from "../Models/Operation";
import { getHttpStatusCode } from "./getHttpStatusCode"
import httpStatus from "http-status-codes";

export function APIErrorResponseMapper(errorStatus: Operation) {
    const errorCode = getHttpStatusCode(errorStatus);
    return {
        code: errorCode,
        errorMessage: httpStatus.getStatusText(errorCode)
    }
}