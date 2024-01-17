
import { IPlayer } from "../../../dtb/tables/parties/types";
import { IUser } from "../../../dtb/tables/users/user.type";
import { IAuthorizationShopPlayer, IUserInfo } from "./type";


/**
 * Parse user info without token
 * @param {IUser} user user values will parsed
 * @returns {IUserInfo} filtered user
 */
export const parseUserToUserAuthorization = (user: IUser): IUserInfo => {
	const { _id, party } = user;
	return { _id, party };
};

/**
 * Parse player info to AuthorizationResponse filtered
 * @param {IPlayer} player player values will parsed
 * @returns {IAuthorizationShopPlayer} filtered player
 */
export const parsePlayerToIShopPlayerAuthorization = (player: IPlayer): IAuthorizationShopPlayer => {
	const { name, state, rol } = player;
	return { name, state, rol };
};

