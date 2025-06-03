import { channel } from 'diagnostics_channel';
import mongoose from 'mongoose';

//collection:channel_members, atributos: member_id, channel_id, created_at, 
const channelMembersSchema = new mongoose.Schema(
    {
        member_id:{
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'User',
            required: true
        },
        channel_id:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            required: true
        },
        created_at:{
            type: Date,
            default: new Date()
        }
    }
)

const ChannelMembers = mongoose.model('channel_members',channelMembersSchema);
export default ChannelMembers