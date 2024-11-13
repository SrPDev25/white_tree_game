import express from 'express';
import { goingPlayerToParty } from '../controllers/controllers';
import { isGameConfig } from '../../../dtb/tables/parties/utils/party';
import { Parties } from '../../../dtb/tables/parties/Parties';
import { Users } from '../../../dtb/tables/users/Users';
import { Players } from '../../../dtb/tables/parties/values/Player';
import { getUserAuthorization } from '../../auth/app/services';

const router = express.Router();


router.use('/', (_req, _res, next) => next());


/** 
 * Add a new player to a party
 * @post
 * @endpoint /game/going/:partyId
 * @param {string} partyId party _id to join
 * @body {string} name player name
 * @returns {IUserAuthorization} user's general and player information
 */
router.post('/going/:partyId', goingPlayerToParty)



/**
 * @post
 * @body {IGameConfig} gameConfig Party game config
 */
router.post('/party', async ({ body }, res) => {
	//Comprobar que el body está bien
	if (!body) return res.status(400).send('Body is undefined');
	//Name check TODO
	
	//GameConfig check
	const gameConfigError = isGameConfig(body.gameConfig);
	if (gameConfigError) return res.status(400).send(gameConfigError);
	//Create a party
	const createPartyRes = await Parties.createParty({ gameConfig: body.gameConfig });

	//Create user
	const addUserRes = await Users.createUser({ party: createPartyRes.insertedId });

	//Insert player as master at the party
	const addPlayerRes = await Players.addPlayer(createPartyRes.insertedId, { _id: addUserRes._id, name: body.name });

	//authorization
	const userAuthorization = await getUserAuthorization(addUserRes.token);

	//res
	const endpointRes = {
		user: userAuthorization,
		party: addPlayerRes
	}

	return res.status(200).send(endpointRes);
})

export default router;