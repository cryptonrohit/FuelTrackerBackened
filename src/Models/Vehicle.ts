export default class Vehicle {
    constructor(
        public userId: string,
        public vehicleNumber: string,
        public vehicleName: string,
        public distanceTravelled: number,
        public fuelConsumed: number,
        public fuelExpense?: number,
        public lastRechargedFuel?: number,
        public lastMileage?: number
    ) {}
}