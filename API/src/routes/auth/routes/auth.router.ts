import express from 'express'
import { playerAutenticacion } from '../controllers/controllers';


//Instacia dentro de express para indicar una ruta
const router = express.Router();

/**
 * Get
 * Devuelve la información que necesita el usuario para usar la aplicacións
 * @get
 * @headers {string} token
 * @returns {IUserInfos}
 */
router.get('/', playerAutenticacion);


//Devuelve la ruta despues de configurada
export default router