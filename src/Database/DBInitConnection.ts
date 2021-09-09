import Knex from "knex";

class DBInitConnection {
    connectionToDB() {
        const configData = {
            client: "pg",
            connection: {
                host: "localhost",
                user: process.env.USER,
                password: process.env.PASSWORD,
                database: process.env.DATABASE_NAME,
                port: process.env.DB_PORT
            }
        }
        return Knex(configData);
    }
}
const dbinitConnection = new DBInitConnection();
export default dbinitConnection;
