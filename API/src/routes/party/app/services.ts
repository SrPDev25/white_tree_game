import ErrorStatus from "../../../common/Error/ErrorStatus";
import { Parties } from "../../../dtb/tables/parties/Parties";
import { PlayerRolEnum } from "../../../dtb/tables/parties/enums";
import { IParty } from "../../../dtb/tables/parties/types";
import { IUserAuthorization } from "../../auth/app/response.type";
import { serviceGetUserAuthorization } from "../../auth/app/services";
import { IUserInfo } from "../../auth/core/type";
import { filterInfoConfig } from "./partyInformationFilter/gamePhaseFilter.config";


/**
 * Find the user authorization and check if the user sparty have this party id
 * @param {string} partyId
 * @param {token} token
 * @returns 
 */
export const getPlayerPartyAuth = async (token: unknown): Promise<IUserAuthorization> => {
	const userAuthorization = await serviceGetUserAuthorization(token);
	return userAuthorization;
};


/**
 * Get player party information
 * @param {IUserAuthorization} userInfo User authorization
 * @returns {Promise<unknown>} return party at different format depending on the game phase
 */
export const serviceGetPlayerPartyInfo = async (userInfo: IUserInfo): Promise<IParty> => {
	//Get party information
	const partyInfo = await Parties.getPartyById(userInfo.party);
	if (!partyInfo)
		throw new ErrorStatus(404, 'Internal server error, party not found');

	//Find player at party
	const player = partyInfo.players.find(player => player._id.equals(userInfo._id));
	if (!player)
		throw new ErrorStatus(404, 'Internal server error, party player not found');
	//Master can see all party information
	if (player.rol === PlayerRolEnum.MASTER)
		return partyInfo;

	//Add player information to user authorization
	const playerAuthorization: IUserAuthorization = { ...userInfo, playerInfo: player };

	//Filter party information
	const filteredPartyInfo = filterInfoConfig[partyInfo.gamePhase](playerAuthorization, partyInfo);

	return filteredPartyInfo

};