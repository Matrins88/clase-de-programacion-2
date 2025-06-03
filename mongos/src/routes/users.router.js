import express from 'express';
import userController from '../controllers/users.controller.js';

//esta ruta se encarga de manejar user
const usersRouter = express.Router()

// creo las rutas que va a tener mi enroutador
usersRouter.get('/', userController.getAll)

usersRouter.post('/register', userController.register)
usersRouter.post('/login', userController.login)


usersRouter.get ('/verify', userController.verify)

usersRouter.get('/resend-verification-email', userController.resendVerificationEmail)

usersRouter.put('/api/users/hola', (request, response)=>{
    response.send('FUNCIONA')
})

export default usersRouter