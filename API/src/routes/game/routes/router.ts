import express from 'express';
import { controllerCreateParty, controllerFindPartyBySimpleId, goingPlayerToParty } from '../controllers/controllers';


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
 * Find a party by simpleId
 * the party must be in recruitment phase and not full
 * @get
 * @endpoint /game/find/:simpleId
 * @param {string} simpleId party simpleId, 7 characters
 * @returns {IFindByPartySimpleId} party _id
 */
router.get('/find/:simpleId', controllerFindPartyBySimpleId);

/**
 * @post
 * @body {IGameConfig} gameConfig Party game config
 */
router.post('/party', controllerCreateParty)

export default router;