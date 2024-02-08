

import { DeleteResult, InsertOneResult, ObjectId } from "mongodb";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { generateToken } from "../../../utils/appFormats/verification/token";
import { getDb } from "../../db";
import { IUser } from "./user.type";



export class Users {

	/**
	 * Add a new user to database
	 * @param {Pick<IUser, 'party'>} newUser necessary data to create a new user
	 * @returns {Promise<InsertOneResult>} InsertOneResult from mongodb
	 */
	static async addUser(newUser: Pick<IUser, 'party'>): Promise<InsertOneResult> {
		let token = generateToken();
		//Check if token is unique
		while ( await this.getUserByToken(token)){
			token = generateToken();
		}

		//Create new user
		const user: Omit<IUser, '_id'> = {
			token,
			party: newUser.party
		};
		//Insert user to database
		const insertInfo = await getDb().collection('users').insertOne(user)
			.then((result: InsertOneResult) => result)
			.catch((error) => {
				console.error(error);
				throw new ErrorStatus(500, 'Error at get user by token');
			});

		return insertInfo;
	}

	/**
	 * Find at database a user by their token
	 * @param {string} token v4 token
	 * @returns {Promise<IUser | null>} User founded or null
	 */
	static async getUserByToken(token: string): Promise<IUser | null> {
		return getDb()?.collection('users').findOne({ token: token })
			.then((user) => user as IUser | null)
			.catch((error) => {
				console.error(error);
				throw new ErrorStatus(500, 'Error at get user by token');
			});
	}

	/**
	 * Find at database using their _id
	 * @param {ObjectId} id Valid mongoDB _id
	 * @returns {Promise<IUser | null>} User founded or null
	 */
	static async getUserById(id: ObjectId): Promise<IUser | null> {
		return getDb()?.collection('users').findOne({ _id: id })
			.then((user) => user as IUser | null)
			.catch((error) => {
				console.error(error);
				throw new ErrorStatus(500, 'Error at get user by token');
			});
	}


	/**
	 * Delete a user founded by their _id
	 * @param {ObjectId} _id user's _id
	 * @returns {Promise<DeleteResult>} DeleteResult from mongodb
	 */
	static async deleteUserById(_id: ObjectId): Promise<DeleteResult> {
		return  await getDb().collection('users').deleteOne({ _id: _id });
	}
}