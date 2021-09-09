import { Knex } from "knex";
import vehicleData from "./TableHandlers/vehicleDataHandler";
import { VEHICLE_DATA } from "./TableNames/tableNames";

class DBInitTable {
    public async createTables(dbConnector: Knex) {
        try {
            const vehicleDataTableCreated = await dbConnector.schema.hasTable(VEHICLE_DATA);
            !vehicleDataTableCreated ? vehicleData.execute(dbConnector) : this.existingTableLog();
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
