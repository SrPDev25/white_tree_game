import ErrorStatus from "../../../common/Error/ErrorStatus";
import { Parties } from "../../../dtb/tables/parties/Parties";
import { IGameConfig, IParty, IPlayer } from "../../../dtb/tables/parties/types";
import { Users } from "../../../dtb/tables/users/Users";
import { IUser } from "../../../dtb/tables/users/user.type";

/**
 * Create at the databe the user and set the player at the party
 * @param {IParty['_id']} partyId party to join
 * @param {IPlayer['name']} playerName player's name
 * @returns {Promise<{ user: IUser; player: IPlayer; }>} user and player created
 */
export const providerCreatePlayer = async (partyId: IParty['_id'], playerName: IPlayer['name']): Promise<{ user: IUser; player: IPlayer; }> => {
	//Create user
	const user = await Users.createUser({ party: partyId });
	if (!user)
		throw new ErrorStatus(500, 'Internal server error, user not created');
	//Create player
	const partyUpdated = await Parties.addPlayer(partyId, { _id: user._id, name: playerName });
	if (!partyUpdated) {
		//Delete user if cant set the user at the party
		await Users.deleteUserById(user._id);
		throw new ErrorStatus(500, 'Internal server error, player not created');
	}
	//Find updated player
	const findPlayer = partyUpdated.players.find(p => p._id.equals(user._id));
	if (!findPlayer)
		throw new ErrorStatus(500, 'Internal server error, player not found');
	//Response
	return { user, player: findPlayer };
}


/**
 * Crate a new empty party
 * @param {IGameConfig} gameConfig party configuration
 * @returns {Promise<IParty['_id']>} new party _id
 */
export const providerCreateParty = async (gameConfig: IGameConfig): Promise<IParty['_id']> => {
	//Create a party
	const createPartyRes = await Parties.createParty({ gameConfig: gameConfig });
	if (!createPartyRes)
		throw new ErrorStatus(500, 'Internal server error, party not created');

	return createPartyRes.insertedId;
}