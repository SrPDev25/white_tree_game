import { Request, Response } from "express";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { isPartyId } from "../../../dtb/tables/parties/utils/party";
import { isString } from "../../../utils/primitive/string";
import { joinPlayerToParty } from "../app/services";


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
		//Request comprobations
		const partyIdError = isPartyId(partyId);
		if (partyIdError)
			throw new ErrorStatus(400, partyIdError);
		if (isString(userName))
			throw new ErrorStatus(400, 'Incorrect user name at body');

		const userAuthorization = await joinPlayerToParty(partyId, userName);

		return res.status(200).send(userAuthorization);
	} catch (error) {
		if (error instanceof ErrorStatus)
			return res.status(error.status).send(error.message);
		else
			return res.status(500).send('Internal server error');
	}
}