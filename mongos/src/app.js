import {ENVIRONMENT} from './environment.js'
import { connectDB} from'./config/db.config.js'
import cors from 'cors'

console.log(ENVIRONMENT)
connectDB();

import Workspace from "./models/Workspace.model.js";
import User from "./models/User.model.js";
import userRepository from "./repositories/users.repository.js";
import workspace_repository from "./repositories/workspace.repository.js";
import WorkspaceMembers from "./models/WorkspaceMembers.model.js";
import { AVAILABLE_ROLES_WORKSPACE_MEMBERS } from './dictionaries/availableRoles.dictionary.js';
import channel from './models/Channel.model.js';
import ChannelMessage from './models/ChannelMessages.model.js';
import ChannelMembers from './models/ChannelMembers.model.js';
import workspaceMembers_repository from './repositories/WorkspaceMembers.repository.js';
import userController from './controllers/users.controller.js'
import express from 'express'
import usersRouter from './routes/users.router.js';
import product_repository from './repositories/products.repository.js';
import productsRouter from './routes/product.router.js';
import productController from './controllers/product.controller.js';
import transporter from './config/mail.config.js';


//console.log('hola mundo');


/*userRepository.create({name:'juanxi', password:"juan1234", email:'juan21@gmail.com'
})

 const workspace = new Workspace({
    name: 'espacio de trabajo 1',
    description: 'Hola...',
    owner_id: '6822821a75aa6972bfd02bb8'
})*/


//workspace.save()




const app= express()// crea una aplicacion de express

//deshabilita la politica de cors
app.use(cors())
app.use(express.json())//configurar que nuestra api lea json

app.get('/',(request, response)=> {
    if(true){
    response.send('<h1>hola soy express</h1>')// solo se puede enviar un consulta por cada get 
    //sino usando if
    } else{
        response.send('<h1>Ups hubo un error</h1>')
    }
})// funcion orientada a eventos
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

app.use('/api/products', productsRouter);
app.use('/api/users', usersRouter);





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



let baseDatosRota = true

app.post('/depositos', (request, response) => {
    console.log('Me llego esta consulta:', request.body)
    if(baseDatosRota ){
        response.status(500).send('La base de datos exploto!!')
    }
    /* esta respuesta tendra status HTTP 200, porque no especifique otra cosa */
    response.status(201).send("Listo, no te la devuelvo mas!")
})
/*WorkspaceMembers.create(
 {user_id:'6822821a75aa6972bfd02bb8', 
 workspace_id:'682293e125cde4d284732ad4', 
 role: AVAILABLE_ROLES_WORKSPACE_MEMBERS.ADMIN})// para probar el enum*/


 /*const products =[
    {
        title: 'Tv samsung',
        price: 4000,
        id:1
    },
    {   title: 'Tv LG',
        price: 5000,
        id:2
    },
    {
        title: 'Tv SONY',
        price:6000,
        id:3
        }
    ]   
    app.get('/productos', (request, response)=>{
        console.log(request.query)
        let max_price = request.query.max_price//guardar la variable max price
        let min_price
        const lista_filtrada = products.filter(products => products.price <= max_price)
        response.send(lista_filtrada)//enviar la lista filtrada
    })*/