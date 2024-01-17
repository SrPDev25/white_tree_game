import ErrorStatus from "../../../common/Error/ErrorStatus";
import { Parties } from "../../../dtb/tables/parties/Parties";
import { GamePhaseEnum } from "../../../dtb/tables/parties/enums";
import { IUserAuthorization } from "../../auth/app/response.type";
import { createPlayer } from "../core/provider";


/**
 * Creat a user and join it to a party
 * @param {string} partyId party to join
 * @param {string} playerName 
 * @returns {Promise<IUserAuthorization>} user's general and player information
 */
export const joinPlayerToParty = async (partyId: string, playerName: string): Promise<IUserAuthorization> => {

	const partyInfo = await Parties.getPartyById(partyId);
	//Party comprobations
	//Check if party exist
	if (!partyInfo)
		throw new ErrorStatus(404, 'Party not found');
	//Party can only be joined at recruitment phase
	if (partyInfo.gamePhase !== GamePhaseEnum.RECRUITMENT)
		throw new ErrorStatus(400, 'Party is not in recruitment phase');
	//Check if party is full
	if (partyInfo.players.length >= partyInfo.gameConfig.maxPlayers)
		throw new ErrorStatus(400, 'Party is full');
	//Player.name must be unique
	if (partyInfo.players.find(p => p.name === playerName))
		throw new ErrorStatus(400, 'Name already used');

	//Player creation
	const playerCreationInfo = await createPlayer(partyId, playerName);

	//Response
	const authorization: IUserAuthorization = {
		...playerCreationInfo.user,
		playerInfo: playerCreationInfo.player
	}

	return authorization;
}