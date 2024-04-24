import ErrorStatus from "../../../common/Error/ErrorStatus";
import { Parties } from "../../../dtb/tables/parties/Parties";
import { PlayerRolEnum } from "../../../dtb/tables/parties/enums";
import { IUserAuthorization } from "../../auth/app/response.type";
import { getUserAuthorization } from "../../auth/app/services";
import { filterInfoConfig } from "./partyInformationFilter/gamePhaseFilter.config";


/**
 * Find the user authorization and check if the user sparty have this party id
 * @param {string} partyId
 * @param {token} token
 * @returns 
 */
export const getPlayerPartyAuth = async (token: unknown): Promise<IUserAuthorization> => {
	const userAuthorization = await getUserAuthorization(token);
	return userAuthorization;
};


/**
 * Get player party information
 * @param {IUserAuthorization} playerAuthorization User authorization
 * @returns {Promise<unknown>} return party at different format depending on the game phase
 */
export const getPlayerPartyInfo = async (playerAuthorization: IUserAuthorization): Promise<unknown> => {
	//Get party information
	const partyInfo = await Parties.getPartyById(playerAuthorization.party);
	if (!partyInfo)
		throw new ErrorStatus(500, 'Internal server error, party not found');

	//Master can see all party information
	if (playerAuthorization.playerInfo.rol === PlayerRolEnum.MASTER)
		return partyInfo;

	//Filter party information
	const filteredPartyInfo = filterInfoConfig[partyInfo.gamePhase](playerAuthorization, partyInfo);

	return filteredPartyInfo

};