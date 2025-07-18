import transporter from "../config/mail.config.js"
import { ENVIRONMENT } from "../environment.js"
import userRepository from "../repositories/users.repository.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const sendVerificationEmail = async ({ email, name, redirect_url }) => {
    const result = await transporter.sendMail(
        {
            from: ENVIRONMENT.GMAIL_USERNAME,
            to: email,
            subject: "Verifica tu correo electronico",
            html: `
            <h1>Bienvenido ${name}</h1>
            <p>
                Necesitamos que des click al siguiente link para verificar que esta es tu cuenta, en caso de no reconocer este registro desestima el mail.
            </p>
            <a href='${redirect_url}'>Click aqui para verificar</a>
            <span>Tienes 7 dias para dar click al link</span>
            `
        }
    )
    console.log('Mail enviado:', result)
}

//Recibir datos de consulta y emitir respuestas
class UserController {
    async register(request, response) {

        /* Validamos que llegen los datos */
        if (!request.body || !request.body.name || !request.body.password || !request.body.email) {
            response.status(400).send({
                message: 'Registro invalido',
                ok: false
            })

        }

        //Hashear la contraseña
        const password_hashed = await bcrypt.hash(request.body.password, 12)


        //Guardar el usuario en la base de datos
        await userRepository.create({
            name: request.body.name,
            password: password_hashed,
            email: request.body.email
        })

        /* Emitimos un token con cierta firma */
        const verification_token = jwt.sign({ email: request.body.email }, ENVIRONMENT.JWT_SECRET_KEY)

        await sendVerificationEmail(
            {
                email: request.body.email,
                name: request.body.name,
                redirect_url: `${ENVIRONMENT.BACKEND_URL}/api/users/verify?verify_token=${verification_token}`
            }
        )

        response.send({
            message: 'Recibido!!, mira que te envie un mail de verificacion',
            ok: true
        })
    }
    async getAll(request, response) {
     

    }

    async verify(request, response) {
        try {

            //Necesitamos capturar el parametro de consulta verify_token
            const verification_token = request.query.verify_token

            //Primero necesito verificar que el token lo emiti yo y que hay token
            if (!verification_token) {
                 return response.redirect(`${ENVIRONMENT.FRONTEND_URL}/login?verified=missing`)
            }
            //Verify intententara ver si la firma es correcta, en caso de no ser correcta emitira (throw) un error
           const contenido = jwt.verify(verification_token, ENVIRONMENT.JWT_SECRET_KEY)

            const user = await userRepository.findByEmail({ email: contenido.email })

            if (!user) {
                return response.redirect(`${ENVIRONMENT.FRONTEND_URL}/login?verified=notfound`)
            }

            if (user.verified) {
                return response.redirect(`${ENVIRONMENT.FRONTEND_URL}/login?verified=already`)
            }

            await userRepository.verifyUserEmail({ email: contenido.email })

            return response.redirect(`${ENVIRONMENT.FRONTEND_URL}/login?verified=success`)

        } catch (error) {
            console.log('Hubo un error', error)
            return response.redirect(`${ENVIRONMENT.FRONTEND_URL}/login?verified=error`)
        }
    }

    async login(request, response) {
        try {
              console.log(' LOGIN solicitado');
              console.log('Body:', request.body);
            const { email, password } = request.body

            if (!email) {
                 console.log(' Falta email');
                throw { status: 400, message: 'no hay email!' }
            }
            if (!password) {
                console.log(' falta');
                throw { status: 400, message: 'no hay password!' }
            }

            //PASO 1.1: Buscar al usuario en la DB por mail
            const user = await userRepository.findByEmail({ email: email })
            if (!user) {
                throw { status: 404, message: 'Usuario no encontrado!' }
            }

            //PASO 1.2: Verificar que el mail este validado
            if (!user.verified) {
                throw { status: 400, message: "Valida tu mail primero" }
            }

            //PASO 2: Verificar si la contraseña que el cliente paso coincide con la que tengo en mi DB
            const is_same_password = await bcrypt.compare(password, user.password)
             console.log(' Password coincide:', is_same_password);
            if (!is_same_password) {
                throw { status: 400, message: 'Contraseña no es valida' }
            }

            //PASO 3: Crear un token con los datos no-sensibles del usuario (sesion)
            const authorization_token = jwt.sign({
                name: user.name,
                email: user.email,
                id: user._id,
                created_at: user.created_at
            },
                ENVIRONMENT.JWT_SECRET_KEY
            )
            //PASO 4: Responder con el token
            response.status(200).send({
                ok: true,
                status: 200,
                message: 'Usuario logueado',
                data: {
                    authorization_token: authorization_token,
                    user: {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        created_at: user.created_at
                    }

                }

            })
        }
        catch (error) {
              console.error('Error en login:', error);
            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        ok: false
                    }
                )
                return
            }
            else {
                console.log('Hubo un error', error)
                response.status(500).send({ message: 'Error interno del servidor', ok: false })
            }
        }
    }
    // GET /api/users/resend-verification-mail
    // body: {email}
    // Debe re-enviar el mail de verificacion si no esta verificado

    async resendVerificationEmail(request, response) {
        try {
            const { email } = request.body

            //Buscamos en la DB al usuario por mail
            const user = await userRepository.findByEmail({ email })
            //Checkeamos que exista
            if (!user) {
                throw {
                    status: 404,
                    message: 'Usuario no encontrado'
                }
            }

            if (user.verified) {
                throw {
                    status: 400,
                    message: 'El usuario ya esta verificado'
                }
            }
            //Creamos un token de verificacion para generar la URL de verificacion
            const verification_token = jwt.sign({ email: email }, ENVIRONMENT.JWT_SECRET_KEY)
            await sendVerificationEmail({
                email,
                name: user.name,
                redirect_url: `${ENVIRONMENT.BACKEND_URL}/api/users/verify?verify_token=${verification_token}`
            })

            //Si todo sale bien respondemos con codigo exitoso
            response.send({
                ok: true,
                message: 'Mail reenviado con exito',
                status: 200
            })
            return
        }
        catch (error) {

            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        ok: false
                    }
                )
                return
            }
            else {
                console.log('Hubo un error', error)
                response.status(500).send({ message: 'Error interno del servidor', ok: false })
            }
        }
    }

}

const userController = new UserController()

export default userController