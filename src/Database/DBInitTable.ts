import { Knex } from "knex";
import vehicleData from "./TableHandlers/vehicleDataHandler";
import mileageTimeSeriesData from "./TableHandlers/mileageTimeSeriesDataHandler";
import { MILEAGE_TIME_SERIES_DATA, VEHICLE_DATA } from "./TableNames/tableNames";

class DBInitTable {
    public async createTables(dbConnector: Knex) {
        try {
            const vehicleDataTableCreated = await dbConnector.schema.hasTable(VEHICLE_DATA);
            !vehicleDataTableCreated ? vehicleData.execute(dbConnector) : this.existingTableLog();
            const mileageTimeSeriesDataCreated = await dbConnector.schema.hasTable(MILEAGE_TIME_SERIES_DATA);
            !mileageTimeSeriesDataCreated ? mileageTimeSeriesData.execute(dbConnector) : this.existingTableLog();
        } catch (error) {
            console.error(`[DB] Issue creating table. Error: ${error}`);
        }
    }
    private existingTableLog() {
        console.log("[DB] Table already existing");
    }
}
const dbTableInit = new DBInitTable();
export default dbTableInit;
