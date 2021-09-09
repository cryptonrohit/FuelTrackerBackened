import getVehicleFuelData from "../Database/Entities/Query/GetVehicleFuelData";
import { Operation } from "../Models/Operation";
import VehicleFuelRecharge from "../Models/VehicleFuelRecharge";

class CalculateVehicleData {
    async calculate(userId: string, fuelRechargeData: VehicleFuelRecharge) {
        try {
            const getVehicleData = await getVehicleFuelData.get(userId);
            const lastRechargedFuel = getVehicleData.data[0].lastRechargedFuel;
            const distanceTravelled = getVehicleData.data[0].distanceTravelled;
            const currentMtrReading = fuelRechargeData.currentMeterReading;
            const totalFuelConsumed = getVehicleData.data[0].fuelConsumed + fuelRechargeData.currentFuelRecharged;
            const totalFuelExpensed = getVehicleData.data[0].fuelExpense + fuelRechargeData.currentFuelExpense;
            const vehicleNumber = getVehicleData.data[0].vehicleNumber;
            const vehicleName = getVehicleData.data[0].vehicleName;
            const mileage = this.calculateMileage(lastRechargedFuel, currentMtrReading, distanceTravelled);
            if (mileage < 0) {
                console.error("Mileage is in negative");
                throw Operation.BadRequest;
            }
            const dataToUpdate = this.updateDataMapper(currentMtrReading, totalFuelConsumed, totalFuelExpensed, fuelRechargeData.currentFuelRecharged, mileage);
            return {mileage, vehicleNumber, vehicleName, lastRechargedFuel, dataToUpdate};
        } catch (error) {
            throw error;
        }
    }
    private updateDataMapper(currentMtrReading: number, totalFuelConsumed: number, totalFuelExpensed: number, lastRechargedFuel: number, mileage: number) {
        return {
            distanceTravelled : currentMtrReading,
            fuelConsumed: totalFuelConsumed,
            fuelExpense: totalFuelExpensed,
            lastRechargedFuel: lastRechargedFuel,
            lastMileage: mileage
        }
    }
    private calculateMileage(lastRechargedFuel: number, currentMtrReading: number, distanceTravelled: number) {
        let mileage = 0;
        if (lastRechargedFuel) {
            mileage = (currentMtrReading - distanceTravelled)/lastRechargedFuel;
        }
        return mileage;
    }
}
const calculateVehicleData = new CalculateVehicleData();
export default calculateVehicleData;
