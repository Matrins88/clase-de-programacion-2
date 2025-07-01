import mongoose from 'mongoose'

// el esquema define las validaciones que deben hacerse al crear un documento o actualizar
const userSchema = new mongoose.Schema (
    //objeto de configuracion/definicion del esquema
    {
        email: { 
            type: String, 
            required: true, 
            unique:true},

        name:{
            type: String,
            required: true
        },
        password:{
            type:String,
            required: true
        },  
        verified: {
            type: Boolean,
            default: false,  // <--- importante
            required: true   
        },
        created_at:{
            type: Date,
            default: new Date()       
         }
    }
)

// creo o defino que la coleccion de los users estara atada a esta validacion cada esquema pertence a una coleccion
const User = mongoose.model ('Users', userSchema)
export default User
