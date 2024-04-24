import { DeleteResult, InsertOneResult } from "mongodb";
import { IParty } from "./types";
import { Players } from "./values/Player";
import { getDb } from "../../db";
import { GamePhaseEnum, PlayerRolEnum, PlayerStateEnum } from "./enums";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { ICreateParty } from "./parties.interfaces";



/**
 * Parties table's request
 */
export class Parties extends Players {
	//TODO


	/**
	 * Create a party
	 * @param {IGameConfig} gameConfig  Party game config
	 * @param {ICreatePlayer} master master of the party
	 * @returns {Promise<InsertOneResult>} 
	 */
	static async createParty({
		gameConfig,
		master
	}: ICreateParty): Promise<InsertOneResult> {
		//New party values
		const newParty: Omit<IParty, '_id'> = {
			gameConfig,
			players: [{
				state: PlayerStateEnum.MASTER,
				...master,
				rol: PlayerRolEnum.MASTER,
			}],
			gamePhase: GamePhaseEnum.RECRUITMENT
		}

		return await getDb().collection('parties').insertOne(newParty)
			.then(result => result)
			.catch(err => {
				console.error(err);
				throw new ErrorStatus(500, 'Error at creating party')
			});
	}

	/**
	 * Find party by their _id
	 * @param {ObjectId} _id party's id
	 * @returns 
	 */
	static async getPartyById(_id: IParty['_id']): Promise<IParty | null> {
		return await getDb().collection('parties').findOne({ _id })
			.then(result => result as IParty | null)
			.catch(err => {
				console.error(err);
				throw new ErrorStatus(500, 'Error at getting party')
			});
	}

	/**
	 * Delete party by their _id
	 * @param {IParty['_id']} _id Party to delete _id
	 * @returns {Promise<DeleteResult>} true if party was deleted, false if not
	 */
	static async deletePartyById(_id: IParty['_id']): Promise<DeleteResult> {
		return await getDb().collection('parties').deleteOne({ _id })
			.then(result => result)
			.catch(err => {
				console.error(err);
				throw new ErrorStatus(500, 'Error at deleting party')
			});
	}

}