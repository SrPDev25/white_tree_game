import { NextFunction, Response } from "express";
import { IPartyRouterRequest } from "../routes/router.type";
import ErrorStatus from "../../../common/Error/ErrorStatus";
import { getPlayerPartyInfo, getPlayerPartyAuth } from "../app/services";


/**
 * Controller at the start of the party router to check
 * if the exist partyId
 * if the user is a player of the party
 * @param {IPartyRouterRequest} req
 * @param {Response} res 
 * @param {NextFunction} next 
 * @returns
 */
export const partyRouterAuthorization = async (req: IPartyRouterRequest, res: Response, next: NextFunction) => {
	try {
		//Check if user is player of this party
		const userAuthorization = await getPlayerPartyAuth(req.headers.token);
		//Add user authorization to request to use it in other controllers
		req.userAuthorization = userAuthorization;
		return next();
	} catch (error) {
		if (error instanceof ErrorStatus)
			return res.status(error.status).send(error.message);
		else
			return res.status(500).send('Internal server error');
	}
};

/**
 * Give the party information player can see
 * @param {IPartyRouterRequest} req 
 * @param {Response} res 
 * @returns 
 */
export const playerPartyInfo = async (req: IPartyRouterRequest, res: Response) => {
	try {
		if(!req.userAuthorization)
			throw new ErrorStatus(500, 'User authorization not found');
		//Get party information
		const partyInfo = await getPlayerPartyInfo(req.userAuthorization);

		if (partyInfo)
			return res.status(200).send(partyInfo);
		else
			return res.status(404).send('Party not found');
	} catch (error) {
		if (error instanceof ErrorStatus)
			return res.status(error.status).send(error.message);
		else
			return res.status(500).send('Internal server error');
	}
}