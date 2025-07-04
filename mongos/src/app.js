import {ENVIRONMENT} from './environment.js'
import { connectDB} from'./config/db.config.js'
import cors from 'cors'
import jwt from 'jsonwebtoken';
const { JsonWebTokenError, sign, verify } = jwt;


console.log(ENVIRONMENT)
connectDB();

import express from 'express'
import usersRouter from './routes/users.router.js';
import productsRouter from './routes/product.router.js';
import authorizationMiddleware from './middlewares/auth.middleware.js';
import workspace_router from './routes/workspace.router.js';
import membersWorkspaceRouter from './routes/membersWorkspace.Router.js';
import channelRouter from './routes/channels.router.js';
import messageRouter from './routes/messages.router.js';
import channelMembersRoutes from './routes/channelMembers.router.js'






const app= express()// crea una aplicacion de express

//deshabilita la politica de cors
app.use(cors())
app.use(express.json())//configurar que nuestra api lea json

app.get('/',(request, response)=> {
  response.send('<h1>hola soy express</h1>')// solo se puede enviar un consulta por cada get 
    }
)// funcion orientada a eventos
// cuando reciba un get en esta direccion '/' ejecuta la funcion
//la callback asociada a  un metodo siempre recibe dosparametros: request y response
// el parametro request es yb ibjeto que contiene toda la info de la respuesta
// el parametro response es ub objeto que contiene la info de respuesta
//response.send es un metodo que permite enviar una respuesta al cliente


//la consukta tipo post si tiene  resquest.body
/*app.post('/api/users', userController.create)// la guardamos en api como prefijo
app.get('/users', userController.getAll)*///hacemos un nueva consulta, distintas versiones

//ESTA ES LA FORMA PROLIJA DE HACER CONSULTA
//PORQUE SI TENEMOS VARIAS CONSULTA Y ORGANIZAMOS EL PROYECTO
app.use ('/api/workspaces', workspace_router)
app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);
app.use ('/api/members', membersWorkspaceRouter);
app.use('/api/channels', channelRouter)
app.use('/api/messages', messageRouter)
app.use('/api/channel-members', channelMembersRoutes);




app.post('/users', usersRouter)
app.post('/api/products', productsRouter)

app.get("/test-tonto",authorizationMiddleware, (request,response)=>{
  response.send("hola")
})//consulta para obtener el token
app.get('/private-info',authorizationMiddleware,(request, response) =>{
  try{
    
  authorization_token
  response.send("clave importante que solo un USUARIO DEBRERIA PODER ACCEDER")

  }catch (error){
 
      response.status(500).send({
        ok:false,
        message: 'ocurrio un error al intentar obtener la informacion',
        status:500
      })
    }

  }

  )

  
 /* app.post('/crear-workspace',
    authorizationMiddleware,
    (request,response)=>{
      //quien esta creando el workspace
      // quien va ser el dueño
      console.log(request.user) //lo traigo de auth.middleware.CONTENIDO DEL TOKEN
      console.log('quien quiere crear el workspace es ' + request.user.id)
      response.send ('workspace creado')
    }
  )*/

//Middleware
//es una funcion que se ejecuta entre medio de un proceso
//entre la consulta  y la respuesta quiero saber si es un dato o la cnsulta
// es json


app.listen (ENVIRONMENT.PORT,()=>{
    console.log(`la aplicacion de esta escuchando en http://localhost:${ENVIRONMENT.PORT}`)
    //se escuche en el puerto 3000 y le paso una callback de confirmacion
    console.log(`esta app se escucha en local host puerto ${ENVIRONMENT.PORT}`)
})


//ENVIAR UN MAIL
/*const enviarMailTest = async () => {
  try {
    const result = await transporter.sendMail({
      from: ENVIRONMENT.GMAIL_USERNAME,      // remitente
      to: ENVIRONMENT.GMAIL_USERNAME2,       // destinatario
      subject: 'Prueba de correo',           // asunto
      html: "<h1>Hola desde Node.js</h1>",   // cuerpo del mensaje
    });

    console.log("Mail enviado:", result);
  } catch (error) {
    console.error("Error al enviar el mail:", error);
  }
};

enviarMailTest();*/



/*let baseDatosRota = true

app.post('/depositos', (request, response) => {
    console.log('Me llego esta consulta:', request.body)
    if(baseDatosRota ){
        response.status(500).send('La base de datos exploto!!')
    }
    // esta respuesta tendra status HTTP 200, porque no especifique otra cosa 
    response.status(201).send("Listo, no te la devuelvo mas!")
})*/
/*WorkspaceMembers.create(
 {user_id:'6822821a75aa6972bfd02bb8', 
 workspace_id:'682293e125cde4d284732ad4', 
 role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN})// para probar el enum*/


 