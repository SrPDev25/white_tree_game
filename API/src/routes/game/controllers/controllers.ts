import { Request, Response } from "express";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { isPartyId } from "../../../dtb/tables/parties/utils/party";
import { isString } from "../../../utils/primitive/string";
import { serviceCreateParty, serviceJoinPlayerToParty } from "../app/services";
import { ObjectId } from "mongodb";
import { isGameConfig } from '../../../dtb/tables/parties/utils/party';

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