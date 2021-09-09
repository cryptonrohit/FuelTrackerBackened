import { Knex } from "knex";
import dbinitConnection from "./dbInitConnection";
import dbTableInit from "./dbInitTable";

class DBConfiguration {
    public dbConnector: Knex;
    private static dbInstance: DBConfiguration;
    constructor() {
        this.dbConnector = dbinitConnection.connectionToDB();
    }
    public static DBInstance(): DBConfiguration {
        if (!DBConfiguration.dbInstance) {
            return new DBConfiguration;
        }
        return DBConfiguration.dbInstance;
    }

    async init(){
        await dbTableInit.createTables(this.dbConnector);
    }
}
const dbConfig = new DBConfiguration();
export default dbConfig;
