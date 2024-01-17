import { IParty } from "../../../../dtb/tables/parties/types";


/**
 * Filter players to show only the necessary information
 * @param {IParty} party party object to change
 * @param {number} playerId this player's _id
 */
export const filterOtherPlayersInfo = (party: IParty, playerId: number): void => {
	party.players = party.players.map(player => {
		//This player can see his information
		if (player._id === playerId) {
			return player;
		}
		//Info other players can see//TODO: remove this comment
		const { _id, name, state, rol } = player;
		return { _id, name, state, rol };
	});
};