import { DeleteResult, InsertOneResult, UpdateResult } from "mongodb";
import { IParty } from "./types";
import { Players } from "./values/Player";
import { getDb } from "../../db";
import { GamePhaseEnum } from "./enums";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { ICreateParty } from "./parties.interfaces";


//En la zona de dtb se encontrará la lógica más interna como las normas sobre las tablas
//Una party siempre se crea con gamePhase: GamePhaseEnum.RECRUITMENT por ejemplo, crear una sin esto daría a errores

/**
 * Parties table's request
 * Como herencia no me gusta nada esto, para ordenar esta bien, pero party no hereda de player. A ver que tal progresa
 */
export class Parties extends Players {

	/**
	 * Create a party
	 * @param {IGameConfig} gameConfig  Party game config
	 * @param {ICreatePlayer} master master of the party
	 * @returns {Promise<InsertOneResult>} 
	 */
	static async createParty({
		gameConfig
	}: ICreateParty): Promise<InsertOneResult> {

		//Crear un código simple para la party que no se repita
		//Comprobar que no se repite
		const simpleId = Math.random().toString(8).substring(2,9)
	

		//New party values
		const newParty: Omit<IParty, '_id'> = {
			gameConfig,
			simpleId,
			players: [],
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
	 * Find party by their _id
	 * @param {ObjectId} _id party's id
	 * @returns 
	 */
	static async getPartyBySimpleId(simpleId: IParty['simpleId']): Promise<IParty | null> {
		return await getDb().collection('parties').findOne({ simpleId })
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

	/**
	 * Update party game word
	 * @param partyId 
	 * @param word 
	 * @returns 
	 */
	static async updateWord(partyId: IParty['_id'], word: string): Promise<UpdateResult> {
		return await getDb().collection<IParty>('parties').updateOne({ _id: partyId }, { $set: { 'word': word } })
			.then(result => result)
			.catch(err => {
				console.error(err);
				throw new ErrorStatus(500, 'Error at updating word')
			});
	}

	/**
	 * Update party game phase
	 * @param partyId 
	 * @param gamePhase 
	 * @returns 
	 */
	static async updateGamePhase(partyId: IParty['_id'], gamePhase: GamePhaseEnum): Promise<UpdateResult> {
		return await getDb().collection<IParty>('parties').updateOne({ _id: partyId }, { $set: { 'gamePhase': gamePhase } })
			.then(result => result)
			.catch(err => {
				console.error(err);
				throw new ErrorStatus(500, 'Error at updating game phase')
			});
	}

}