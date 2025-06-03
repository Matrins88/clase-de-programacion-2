import mongoose from 'mongoose';

// collection:channel. atributos: name, workspace_id,created_at, private
const channelSchema = new mongoose.Schema (
    {
        name:{
            type: String,
            required:true
        },
        workspace_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'workspace',
            required: true
        },
        created_at:{
            type: Date,
            default: new Date()
        },
        private:{
            type: Boolean,
            default: false,
            required:true
        }
    }
)
const Channel= mongoose.model('Channel', channelSchema);
export default Channel