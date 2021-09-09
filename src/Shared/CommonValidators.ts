import { ObjectDefault } from "../Models/ObjectDefault";

export function checkIfDefined(resData: string[]): boolean {
    return resData.some(eachResData => eachResData !== undefined && eachResData !== null && eachResData !== "");
}
export function checkDuplicateKey(objToCheck: ObjectDefault, errorCode: string): boolean {
    return Object.values(objToCheck).includes(errorCode) ? true : false;
}
