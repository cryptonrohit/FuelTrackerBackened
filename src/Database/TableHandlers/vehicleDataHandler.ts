import { Knex } from "knex";
import { VEHICLE_DATA } from "../TableNames/tableNames";

class VehicleData {
    async execute(dbConnector: Knex) {
        console.log(`[DB] Creating new table: ${VEHICLE_DATA}`);
        return await dbConnector.schema.createTable(VEHICLE_DATA , (table) => {
            table.string("userId").notNullable().unique();
            table.string("vehicleNumber").notNullable().unique();
            table.primary(["vehicleNumber", "userId"]);
            table.string("vehicleName").notNullable();
            table.integer("distanceTravelled");
            table.integer("fuelConsumed").defaultTo(0);
            table.integer("fuelExpense").defaultTo(0);
            table.integer("lastRechargedFuel").defaultTo(0);
            table.decimal("lastMileage").defaultTo(0);
            table.timestamp("registeredOn");
        })
    }
}
const vehicleData = new VehicleData();
export default vehicleData;
