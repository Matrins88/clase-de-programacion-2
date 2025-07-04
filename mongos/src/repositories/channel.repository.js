import Channel from '../models/Channel.model.js';

class ChannelRepository {
    async create (workspaceId, name, isPrivate){
        try{
            const channel = new Channel ({
                workspace_id: workspaceId,
                name,
                private: isPrivate
            });
            await channel.save();
            return channel;
        }catch(error){
            throw error;
        }
    }
    async findByName(workspaceId, name){
        try{
            const channel = await Channel.findOne({workspace_id: workspaceId, name});
            return channel;
        }catch(error){
            throw error;
        }
    }
    async findById(channelId){
        try{
            const channel = await Channel.findById(channelId);
            return channel;
        }catch(error){
            throw error;
        }
    }

    async getAllByWorkspace(workspaceId){
        try{
            const channels = await Channel.find({workspace_id: workspaceId});
            return channels;
            }catch(error){
            throw error;
            }
}
}

const channel_repository = new ChannelRepository();
export default channel_repository