import { Request, Response } from "express";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { IUserAuthorization } from "../../auth/app/response.type";
import { serviceGetUserAuthorization } from "../../auth/app/services";


/**
 * Add a new player to a party
 * @post
 * @param {string} partyId party _id to join
 * @body {string} name player name
 * @returns {IUserAuthorization} user's general and player information
 */
export const controllerPlayerInfo = async (req: Request, res: Response) => {
	try {
		//Información del jugador
		const playerInfo: IUserAuthorization = await serviceGetUserAuthorization(req.headers.token);
		

		return res.status(200).send(playerInfo);
	} catch (error) {
		if (error instanceof ErrorStatus)
			return res.status(error.status).send(error.message);
		else
			return res.status(500).send('Internal server error');
	}
}
