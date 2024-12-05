import { Request, Response } from "express";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { isPartyId, isPartySimpleId } from "../../../dtb/tables/parties/utils/party";
import { isString } from "../../../utils/primitive/string";
import { serviceCreateParty, serviceFindPartyBySimpleId, serviceJoinPlayerToParty } from "../app/services";
import { ObjectId } from "mongodb";
import { isGameConfig } from '../../../dtb/tables/parties/utils/party';
import { GamePhaseEnum } from "../../../dtb/tables/parties/enums";
import { IFindByPartySimpleId } from "../routes/response.type";

/**
 * Add a new player to a party
 * @post
 * @param {string} partyId party _id to join
 * @body {string} name player name
 * @returns {IUserAuthorization} user's general and player information
 */
export const goingPlayerToParty = async (req: Request, res: Response) => {
	try {
		const { partyId } = req.params;
		const userName = req.body.name;
		//Request checks
		const partyIdError = isPartyId(partyId);
		if (partyIdError)
			throw new ErrorStatus(400, partyIdError);
		if (isString(userName))
			throw new ErrorStatus(400, 'Incorrect user name at body');

		const userAuthorization = await serviceJoinPlayerToParty(new ObjectId(req.params.partyId), userName);

		return res.status(200).send(userAuthorization);
	} catch (error) {
		if (error instanceof ErrorStatus)
			return res.status(error.status).send(error.message);
		else
			return res.status(500).send('Internal server error');
	}
}

/**
 * Find a party by simpleId
 * the party must be in recruitment phase and not full
 * @param {string} simpleId party simpleId, 7 characters
 * @returns {IFindByPartySimpleId} party _id
 */
export const controllerFindPartyBySimpleId = async ({params}: Request, res: Response) => {

	try {
		//Checks
		const checkError = isPartySimpleId(params.simpleId);
		if (checkError)
			return res.status(400).send(checkError);
		//Find
		const party = await serviceFindPartyBySimpleId(params.simpleId);
		//Check party status
		if(!party)
			return res.status(404).send('Party not found');
		if(party.gamePhase !== GamePhaseEnum.RECRUITMENT)
			return res.status(403).send('Party is not in recruitment phase');
		if(party.players.length >= party.gameConfig.maxPlayers)
			return res.status(403).send('Party is full');
		//Response
		const response: IFindByPartySimpleId = {
			partyId: party._id
		};

		return res.status(200).send(response);

	} catch (error) {
		return res.status(500).send('find simple id')
	}
}

/**
 * Add a new player to a party
 * @post
 * @body {IGameConfig} gameConfig config of the game
 * @body {string} name master's player name
 * @returns {IUserAuthorization} user's general and player information
 */
export const controllerCreateParty = async ({ body }: Request, res: Response) => {
	try {
		//Comprobar que el body está bien
		if (!body) return res.status(400).send('Body is undefined');
		//Name check TODO

		//GameConfig check
		const gameConfigError = isGameConfig(body.gameConfig);
		if (gameConfigError) return res.status(400).send(gameConfigError);

		const newPartyId = await serviceCreateParty(body.gameConfig);
		const newPlayer = await serviceJoinPlayerToParty(newPartyId, body.name);

		//res
		const endpointRes = {
			user: newPlayer,
			party: newPartyId
		}

		return res.status(200).send(endpointRes);
	} catch (error) {
		if (error instanceof ErrorStatus)
			return res.status(error.status).send(error.message);
		else
			return res.status(500).send('Internal server error');
	}
}