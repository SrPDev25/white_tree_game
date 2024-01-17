import express from 'express';
import { goingPlayerToParty } from '../controllers/controllers';

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


export default router;