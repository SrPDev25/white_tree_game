import { Response } from "express";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { IUserAuthorization } from "../../auth/app/response.type";
import { serviceGetUserAuthorization } from "../../auth/app/services";
import { IPlayStartRequest } from "../routes/response.type";
import { GamePhaseEnum, PlayerRolEnum } from "../../../dtb/tables/parties/enums";
import { Players } from "../../../dtb/tables/parties/values/Player";
import { getPlayerPartyInfo } from "../../party/app/services";
import { Parties } from "../../../dtb/tables/parties/Parties";


/**
 * Add a new player to a party
 * @post
 * @param {string} partyId party _id to join
 * @body {string} name player name
 * @returns {IUserAuthorization} user's general and player information
 */
export const controllerPlayerInfo = async (req: IPlayStartRequest, res: Response) => {
	try {

		//TODO: Refactorizar y pasar a servicios
		
		//Verificar permisos de accion
		//Verificar información del jugador
		const playerInfo: IUserAuthorization = await serviceGetUserAuthorization(req.headers.token);
		//TODO: Si no existe un usuario master, borrar partida
		if(playerInfo.playerInfo.rol !== PlayerRolEnum.MASTER)
			throw new ErrorStatus(500, 'No master player found');
		
		//Verificar palabra clave
		if(!req.body.word)
			throw new ErrorStatus(400, 'Word is required');

		//Verificar jugador infiltrado
		const partyInfo = await getPlayerPartyInfo(playerInfo);
		const infiltratorPlayerInfo = partyInfo.players.find(player => player._id.equals(req.body.infiltrator));
		if(!infiltratorPlayerInfo)
			throw new ErrorStatus(400, 'Infiltrator player not found');
		else if(infiltratorPlayerInfo.rol === PlayerRolEnum.MASTER)
			throw new ErrorStatus(400, 'Master player can not be infiltrator');

		//La partida tiene que estar en gamephase recruitment
		if(partyInfo.gamePhase !== GamePhaseEnum.RECRUITMENT)
			throw new ErrorStatus(400, 'Party is not in recruitment phase');

		//Iniciar partida
		Players.updatePlayerInfiltrator(playerInfo.party, infiltratorPlayerInfo._id);
		Parties.updateWord(playerInfo.party, req.body.word);
		Parties.updateGamePhase(playerInfo.party, GamePhaseEnum.WORDS);

		return res.status(200).send(playerInfo);
	} catch (error) {
		if (error instanceof ErrorStatus)
			return res.status(error.status).send(error.message);
		else
			return res.status(500).send('Internal server error');
	}
}
