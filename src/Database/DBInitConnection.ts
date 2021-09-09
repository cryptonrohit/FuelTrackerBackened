import Knex from "knex";

class DBInitConnection {
    connectionToDB() {
        const configData = {
            client: "pg",
            connection: {
                host: "localhost",
                user: "postgres",
                password: "crypton10",
                database: "postgres",
                port: 5432
            }
        }
        return Knex(configData);
    }
}
const dbinitConnection = new DBInitConnection();
export default dbinitConnection;
