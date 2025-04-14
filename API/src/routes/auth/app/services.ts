import { isTokenValid } from "../../../utils/appFormats/verification/token";
import { AuthorizationServices } from "../core/provider";
import { IUserAuthorization } from "./response.type";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { serviceGetPlayerPartyInfo } from "../../party/app/services";


/**
 * Check user autentication and 
 * @header {User['token']} token user's token
 * @returns {IUserAuthorization} user's general and player information
 */
export const serviceGetUserAuthorization = async (userToken: unknown): Promise<IUserAuthorization> => {
	//Params validation
	const badRequest = isTokenValid(userToken);
	if (badRequest)
		throw new ErrorStatus(400, badRequest);

	//Database request
	const user = await AuthorizationServices.checkUserToken(userToken as string);
	if(!user)
		throw new ErrorStatus(404, 'User not found');
	//Get party info, then filter info //FUTURE: estaría genial en un futuro cambiarlo por un esquema de roles, pero lo lo tanto se filtra por código
	const party = await serviceGetPlayerPartyInfo(user);

	if(!party)
		throw new ErrorStatus(500, 'Internal server error, player party not found')

	const player = party.players.find(player => player._id.equals(user._id));

	if(!player)
		throw new ErrorStatus(500, 'Internal server error, player not found');
	//Information filter
	const authenticationInfo: IUserAuthorization = { ...user, playerInfo: player};

	//Response
	return authenticationInfo;
};