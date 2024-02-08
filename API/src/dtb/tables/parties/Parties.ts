import { IParty } from "./types";
import { Players } from "./values/Player";



/**
 * Parties table's request
 */
export class Parties extends Players {
	//TODO
	/**
	 * Find party by their _id
	 * @param {string} _id 
	 * @returns 
	 */
	static async getPartyById(_id: IParty['_id']): Promise<IParty | undefined> {
		console.log(_id)
		/* const party = fakePartyDataBase.find(party => party._id === _id); */
		return undefined;
	}

	/**
	 * Delete party by their _id
	 * @param {IParty['_id']} _id Party to delete _id
	 * @returns {boolean} true if party was deleted, false if not
	 */
	static async deletePartyById(_id: IParty['_id']): Promise<boolean> {
		console.log(_id)
		//Find party
		const party = undefined;
		if (party) {
			return true;
		} else
			return false
	}

	
}