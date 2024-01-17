import { Parties } from "../../../dtb/tables/parties/Parties";
import { IParty, IPlayer } from "../../../dtb/tables/parties/types";
import { Users } from "../../../dtb/tables/users/Users";
import { IUser } from "../../../dtb/tables/users/user.type";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { parseUserToUserAuthorization } from "./serializer";
import { IUserInfo } from "./type";


export class AuthorizationServices {

	/**
	 * Check if a user exist and return it
	 * @param {string} token 
	 * @returns {Promise<IUserInfo>}
	 */
	static checkUserToken(token: string): Promise<IUserInfo> {
		return Users.getUserByToken(token)
			.then((user: IUser | undefined) => {
				if (user)
					return parseUserToUserAuthorization(user);
				else
					throw new ErrorStatus(404, 'User not found');
			});
	}

	/**
	 * Search the user at party database and return it
	 * @param {string} userId player's _id
	 * @param {string} partyId party's _id
	 * @throws {ErrorStatus} 404 if party or player not found
	 * @returns 
	 */
	static async getPartyPlayerInfo(userId: IPlayer['_id'], partyId: IParty['_id']): Promise<IPlayer> {
		const party = await Parties.getPartyById(partyId);
		if (party){
			const player = party.players.find(player => player._id === userId);
			if (player)
				return player;
			else{
				throw new ErrorStatus(404, 'Player not found');
			}
		//User at users database but not at party database
		} else{
			throw new ErrorStatus(404, 'Party not found');
		}
			
			
	}
}