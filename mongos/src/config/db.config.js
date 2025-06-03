import mongoose from 'mongoose'
import { ENVIRONMENT } from '../environment.js'

// configurar la conexion de mi mongo DB
export const connectDB = async() =>{
    try{
        await mongoose.connect(
           `${ENVIRONMENT.DB_URL}/${ENVIRONMENT.DB_NAME}` 
        )
    console.log('conexion exitosa')
    }catch(error){
        console.log('error de conexion', error)
    }
}
