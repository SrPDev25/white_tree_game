import ErrorStatus from "../../../common/Error/ErrorStatus";
import { Parties } from "../../../dtb/tables/parties/Parties";
import { IParty, IPlayer } from "../../../dtb/tables/parties/types";
import { Users } from "../../../dtb/tables/users/Users";
import { IUser } from "../../../dtb/tables/users/user.type";

/**
 * Create at the databe the user and set the player at the party
 * @param {IParty['_id']} partyId party to join
 * @param {IPlayer['name']} playerName player's name
 * @returns {Promise<{ user: IUser; player: IPlayer; }>} user and player created
 */
export const createPlayer = async (partyId: IParty['_id'], playerName: IPlayer['name']): Promise<{ user: IUser; player: IPlayer; }> => {
	//Create user
	const user = await Users.addUser({ party: partyId });
	if (!user)
		throw new ErrorStatus(500, 'Internal server error, user not created');
	//Create player
	const newPlayer = await Parties.addPlayer(partyId, { _id: user._id, name: playerName });
	if (!newPlayer) {
		//Delete user if cant set the user at the party
		await Users.deleteUserById(user._id);
		throw new ErrorStatus(500, 'Internal server error, player not created');
	}


	return { user, player: newPlayer };
}