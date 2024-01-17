
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { generateRandomString } from "../../../utils/primitive/string";
import { fakeUserDataBase } from "../../fakeDatabase";
import { IUser } from "./user.type";



export class Users {

	/**
	 * Add a new user to database
	 * @param {Pick<IUser, 'party'>} newUser necessary data to create a new user
	 * @returns {Promise<IUser | undefined>}
	 */
	static async addUser(newUser: Pick<IUser, 'party'>): Promise<IUser | undefined> {
		//Last user _id used
		const lastId = fakeUserDataBase[fakeUserDataBase.length - 1]._id;

		let token = generateRandomString(18);

		while(fakeUserDataBase.find(user => user.token === token))
			token = generateRandomString(18);

		//Create new user
		const user: IUser = {
			_id: lastId + 1,
			token,
			party: newUser.party
		};

		//Add user to database
		fakeUserDataBase.push(user);
		return user;
	}

	/**
	 * Find at database a user by their token
	 * @param {string} token 18 characters token
	 * @returns {Promise<IUser | undefined>} User founded or undefined
	 */
	static async getUserByToken(token: string): Promise<IUser | undefined> {
		const user = fakeUserDataBase.find((user: IUser) => user.token === token);
		return user;
	}


	/**
	 * Delete a user founded by their _id
	 * @param {number} _id user's _id
	 */
	static async deleteUserById(_id: number): Promise<void> {
		const index = fakeUserDataBase.findIndex((user: IUser) => user._id === _id);
		//Filter found user error
		if (index !== -1)
			throw new ErrorStatus(500, 'Error at delete user');
		fakeUserDataBase.splice(index, 1);
		console.log(fakeUserDataBase);
	}
}