//Index sinedo la principal direccion de la api
import express from 'express'

import authRouter from './routes/auth/routes/auth.router'
import partyRouter from './routes/party/routes/router'
import gameRouter from './routes/game/routes/router'

//Se crea instacia de experss
const app = express()
app.use(express.json())

//El puerto del servidor al que va a estar escuchando la api
//TODO poner el puerto en variable de entorno
const PORT = 3000

//Auth route
app.use('/auth', authRouter);
//Parties route
app.use('/party', partyRouter);
//Game route
app.use('/game', gameRouter);


//Listener
//Inicia la escucha por parte de la instacia de express en un puerto concreto
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})