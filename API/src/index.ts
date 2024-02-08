//Index sinedo la principal direccion de la api
import express from 'express'

import authRouter from './routes/auth/routes/auth.router'
import partyRouter from './routes/party/routes/router'
import gameRouter from './routes/game/routes/router'
import { connectToDb } from './dtb/db'
import { Users } from './dtb/tables/users/Users'
import { ObjectId } from 'mongodb'

//Se crea instacia de experss
const app = express()
app.use(express.json())

//El puerto del servidor al que va a estar escuchando la api
//TODO poner el puerto en variable de entorno
const PORT = 3000
//Generate database conexion a start the server
connectToDb((err?: unknown) => {
	if (err) {
		console.log('Error connecting to DB')
		console.error(err)
	} else {
		console.log('DB connected')
		//Inicia la escucha por parte de la instacia de express en un puerto concreto
		app.listen(PORT, () => {
			console.log(`Server running on port ${PORT}`)
		})
	}
})

//Auth route
app.use('/auth', authRouter);
//Parties route
app.use('/party', partyRouter);
//Game route
app.use('/game', gameRouter);

// Test route
app.get('/test/:userId', (req, res) => {
	try {
		return Users.deleteUserById(new ObjectId(req.params.userId))
			.then((result) => {
				return res.status(500).send(String(result.deletedCount))
			})
			.catch((error) => res.status(500).send(error));
	} catch (error) {
		return res.status(500).send(error)
	}
});