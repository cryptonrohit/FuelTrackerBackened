import { Knex } from "knex";
import { MILEAGE_TIME_SERIES_DATA } from "../TableNames/tableNames";

class MileageTimeSeriesData {
    async execute(dbConnector: Knex) {
        console.log(`[DB] Creating new table: ${MILEAGE_TIME_SERIES_DATA}`);
        return await dbConnector.schema.createTable(MILEAGE_TIME_SERIES_DATA , (table) => {
            table.string("userId").notNullable();
            table.string("vehicleNumber").notNullable();
            table.string("vehicleName").notNullable();
            table.decimal("mileage").defaultTo(0);
            table.integer("fuelRecharged").defaultTo(0);
            table.timestamp("timestamp");
        })
    }
}
const mileageTimeSeriesData = new MileageTimeSeriesData();
export default mileageTimeSeriesData;
