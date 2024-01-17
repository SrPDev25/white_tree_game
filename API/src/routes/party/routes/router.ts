import express from 'express'
import { partyRouterAuthorization, playerPartyInfo } from '../controllers/controllers';

//Instacia dentro de express para indicar una ruta
const router = express.Router();

router.use('/', async (_req, _res, next) => next());



// Party authorization filter
router.use('/:partyId', partyRouterAuthorization);

/**
 * @description Get party information, filtered by player authorization
 * @get
 * @path /party/:partyId
 * @param {string} partyId user party _id
 * @header {string} token user's token
 * 
 * @returns {Party | IDefaultPhaseFilter | IWordsPhaseFilter | IVotingPhaseFilter | IVotingResultsPhaseFilter}
 * 		party information filtered by player authorization
 */
router.get('/:partyId', playerPartyInfo);

router.get('/:partyId/ej', async (_req, res) => {
	return res.status(200).send('Party not found');
});


export default router