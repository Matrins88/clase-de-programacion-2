import { create } from 'domain';
import mongoose from 'mongoose';
import { type } from 'os';

//collection_channel_messages, atributos: member_channel_id, channel_id, content, created_at
const channelMessagesSchema = new mongoose.Schema(
    {
        member_channel_id:{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'MemberChannel',
            required: true
        },
        channel_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Channel',
            required: true

        },
        content: {
            type: String,
            required: true
        },
        created_at:{
            type: Date,
            default: new Date()
        }

    }
)

const ChannelMessage = mongoose.model('channel_messages', channelMessagesSchema);
export default ChannelMessage