import { isTokenValid } from "../../../utils/appFormats/verification/token";
import { AuthorizationServices } from "../core/provider";
import { IUserAuthorization } from "./response.type";
import ErrorStatus from "../../../common/Error/ErrorStatus";


/**
 * Check user autentication and 
 * @header {User['token']} token user's token
 * @returns {IUserAuthorization} user's general and player information
 */
export const getUserAuthorization = async (userToken: unknown): Promise<IUserAuthorization> => {
	//Params validation
	const badRequest = isTokenValid(userToken);
	if (badRequest)
		throw new ErrorStatus(400, badRequest);

	//Database request
	const user = await AuthorizationServices.checkUserToken(userToken as string);
	const player = await AuthorizationServices.getPartyPlayerInfo(user._id, user.party)
		.then((player) => player)
		.catch((error: ErrorStatus) => {
			console.error({
				...error,
				warning: 'Corrupted user'
			});
		});
	if(!player)
		throw new ErrorStatus(500, 'Internal server error, player party not found')

	//Information filter
	const authenticationInfo: IUserAuthorization = { ...user, playerInfo: player};

	//Response
	return authenticationInfo;
};