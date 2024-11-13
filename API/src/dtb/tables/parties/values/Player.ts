import { WithId } from "mongodb";
import { getDb } from "../../../db";
import { CollectionsEnum } from "../../collections.enum";
import { GamePhaseEnum, PlayerRolEnum, PlayerStateEnum } from "../enums";
import { Parties } from "../Parties";
import { IParty, IPlayer } from "../types";
import ErrorStatus from "../../../../common/Error/ErrorStatus";
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
	static async addPlayer(partyId: IParty['_id'], player: Pick<IPlayer, '_id' | 'name' | 'rol'>): Promise<WithId<IParty> | null> {
		let playerRol = PlayerRolEnum.PLAYER;
		
		//Find party
		const party = await Parties.getPartyById(partyId);

		if (!party)
			throw new Error('Player party not found');

		//Check if party is in recruitment phase
		if (party.gamePhase !== GamePhaseEnum.RECRUITMENT)
			throw new Error('Party is not in recruitment');

		//Check if party is full
		if (party.players.length >= party.gameConfig.maxPlayers)
			throw new Error('Party is full');

		//If this party have no master, set this player as master
		if(!party.players.find(value => value.rol === PlayerRolEnum.MASTER))
			playerRol = PlayerRolEnum.MASTER;

		//New Player info
		const newPlayer: IPlayer = {
			_id: player._id,
			name: player.name,
			rol: playerRol,
			state: PlayerStateEnum.ALIVE
		};

		return await getDb().collection<IParty>(CollectionsEnum.PARTIES)
			.findOneAndUpdate({ _id: partyId }, { $push: { 'players': newPlayer } }, { returnDocument: 'after' })
			.then(result => {
				return result;
			})
			.catch(err => {
				console.error(err);
				throw new ErrorStatus(500, 'Error at adding user at party')
			});
	}

	/**
	 * Update player values
	 * @param {IParty['_id']} partyId party _id
	 * @param {IPlayer} player new player info
	 * @returns 
	 */
	static async updatePlayer(partyId: IParty['_id'], player: IPlayer): Promise</* IParty | */ undefined> {
		console.log(partyId, player)
		//Find party
		const party = undefined;
		if (party) {
			//If this player dont exist in party, return undefined
			/* if (party.players.find(value => value._id === player._id)) {
				party.players = party.players.map(value => value._id !== player._id ? value : player);
				return { ...party };
			} else
				return undefined; */
		} else
			return undefined;
	}

	/**
	 * Remove a player from a party
	 * @param {IParty['_id']} partyId party to remove player
	 * @param {IPlayer['_id']} playerId player _id to remove
	 * @returns {IParty | undefined} party without player or undefined if party not found or player not found
	 */
	static async removePlayer(partyId: IParty['_id'], playerId: IPlayer['_id']): Promise</* IParty |  */undefined> {
		console.log(partyId, playerId)
		//Find party
		const party = undefined;
		if (party) {
			//If this player dont exist in party, return undefined
			/* if (party.players.find(player => player._id === playerId)) {
				party.players = party.players.filter(player => player._id !== playerId);
				return { ...party };
			} else
				return undefined; */
		} else
			return undefined;
	}

}