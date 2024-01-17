import { fakePartyDataBase } from "../../fakeDatabase";
import { IParty } from "./types";
import { Players } from "./values/Player";



/**
 * Parties table's request
 */
export class Parties extends Players {

	/**
	 * Find party by their _id
	 * @param {string} _id 
	 * @returns 
	 */
	static async getPartyById(_id: IParty['_id']): Promise<IParty | undefined> {
		const party = fakePartyDataBase.find(party => party._id === _id);
		return party;
	}

	/**
	 * Delete party by their _id
	 * @param {IParty['_id']} _id Party to delete _id
	 * @returns {boolean} true if party was deleted, false if not
	 */
	static async deletePartyById(_id: IParty['_id']): Promise<boolean> {
		//Find party
		const party = fakePartyDataBase.find(party => party._id === _id);
		if (party) {
			fakePartyDataBase.splice(fakePartyDataBase.indexOf(party), 1);
			return true;
		} else
			return false
	}

	
}