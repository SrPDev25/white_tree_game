import express from 'express'
import { partyRouterAuthorization, playerPartyInfo } from '../controllers/controllers';

//Instacia dentro de express para indicar una ruta
const router = express.Router();


// Party authorization filter
router.use('/', partyRouterAuthorization);

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
router.get('/', playerPartyInfo);



/**
 * TODO: Implementar
 * Get the iformation of the party with the same id
 */
router.get('/:partyId/ej', async (_req, res) => {
	return res.status(200).send('Party not found');
});


export default router