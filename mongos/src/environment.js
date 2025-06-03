import dotenv from 'dotenv'//import default. esportamos por defecto lo que esta en dotenv
//import {config} from 'dotenv'// import normal me traigo especificamente el metodo config

//esto carga las variables de entorno en la variable de process.env
dotenv.config()

export const ENVIRONMENT = {
    API_KEY: process.env.API_KEY,
    GMAIL: process.env.GMAIL,
    DB_URL: process.env.DB_URL,
    DB_NAME: process.env.DB_NAME,
    PORT: process.env.PORT,
    GMAIL_PASSWORD: process.env.GMAIL_PASSWORD,
    GMAIL_USERNAME: process.env.GMAIL_USERNAME,
    GMAIL_USERNAME2: process.env.GMAIL_USERNAME2,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY
}

