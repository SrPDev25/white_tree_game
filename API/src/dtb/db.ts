import { Db, MongoClient } from "mongodb";

//Database connection
let dbConnection: Db;


/**
 * Connect to the database
 * @param {CallableFunction} cb 
 */
export const connectToDb = (cb: CallableFunction) => {
	MongoClient.connect('mongodb://localhost:27017/TFG')
		.then((client) => {
			dbConnection = client.db(); 
			return cb();
		})
		.catch((err) => {
			console.error(err);
			return cb(err);
		});
}

/**
 * Give the database connection
 * @returns {Db} database connection
 */
export const getDb = () => dbConnection
