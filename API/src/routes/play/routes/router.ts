import express from 'express';
import { controllerEndGame, controllerPlayerInfo, controllerStartGame } from '../controllers/controllers';
import { controllerAuthorization } from '../../auth/controllers/controllers';


const router = express.Router();

// esta muy raro el controlar el token y todo cada vez que se hace una peticion + volver a pedirlo en cada controlador
router.use('/', controllerAuthorization);

router.get('/', controllerPlayerInfo);

router.post('/start', controllerStartGame);

router.post('/end', controllerEndGame);

export default router;