import { fakePartyDataBase } from "../../../fakeDatabase";
import { PlayerRolEnum, PlayerStateEnum } from "../enums";
import { IParty, IPlayer } from "../types";

/**
 * party.players table's request
 */
export class Players {

	/**
	 * Add a new player to a party
	 * @param {IParty['_id']} partyId party to add player
	 * @param {IPlayer} player  player to add
	 * @returns {IPlayer | undefined} party with new player or undefined if party not found
	 */
	static async addPlayer(partyId: IParty['_id'], player: Pick<IPlayer, '_id' | 'name' | 'rol'>): Promise<IPlayer | undefined> {
		//Find party
		const party = fakePartyDataBase.find(party => party._id === partyId);

		//New Player info
		const newPlayer: IPlayer = {
			_id: player._id,
			name: player.name,
			rol: player.rol ?? PlayerRolEnum.PLAYER,
			state: PlayerStateEnum.ALIVE
		};
	
		if (party) {
			party.players.push(newPlayer);
			return { ...newPlayer };
		} else
			return undefined;
	}

	/**
	 * Update player values
	 * @param {IParty['_id']} partyId party _id
	 * @param {IPlayer} player new player info
	 * @returns 
	 */
	static async updatePlayer(partyId: IParty['_id'], player: IPlayer): Promise<IParty | undefined> {
		//Find party
		const party = fakePartyDataBase.find(party => party._id === partyId);
		if (party) {
			//If this player dont exist in party, return undefined
			if (party.players.find(value => value._id === player._id)) {
				party.players = party.players.map(value => value._id !== player._id ? value : player);
				return { ...party };
			} else
				return undefined;
		} else
			return undefined;
	}

	/**
	 * Remove a player from a party
	 * @param {IParty['_id']} partyId party to remove player
	 * @param {IPlayer['_id']} playerId player _id to remove
	 * @returns {IParty | undefined} party without player or undefined if party not found or player not found
	 */
	static async removePlayer(partyId: IParty['_id'], playerId: IPlayer['_id']): Promise<IParty | undefined> {
		//Find party
		const party = fakePartyDataBase.find(party => party._id === partyId);
		if (party) {
			//If this player dont exist in party, return undefined
			if (party.players.find(player => player._id === playerId)) {
				party.players = party.players.filter(player => player._id !== playerId);
				return { ...party };
			} else
				return undefined;
		} else
			return undefined;
	}

}