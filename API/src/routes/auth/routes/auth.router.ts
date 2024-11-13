import express from 'express'
import { playerAuthentication} from '../controllers/controllers';


//Instacia dentro de express para indicar una ruta
const router = express.Router();

/**
 * Get
 * Devuelve la información que necesita el usuario para usar la aplicacións
 * @get
 * @headers {string} token
 * @returns {IUserInfos}
 */
router.get('/', playerAuthentication);


//Devuelve la ruta despues de configurada
export default router