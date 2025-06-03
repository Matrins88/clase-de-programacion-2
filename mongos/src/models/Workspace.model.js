import mongoose from "mongoose"

const workspaceSchema = new mongoose. Schema({
    name:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    //esto es lo mismo que esta arriba, pero no me puedo traer el tipado de objectId
    owner_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',// valida que cuando se cree el workspace el owner_id sea un user_id valido
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now()
    }
        
})
const Workspace = mongoose.model('Workspaces', workspaceSchema);

export default Workspace