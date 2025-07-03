// services/channelMembers.service.js
import ChannelMembers from "../models/ChannelMembers.model.js";
import channel_members_repository from "../repositories/channelMembers.repository.js";
import userRepository from "../repositories/users.repository.js";

class ChannelMembersService {
    async addMember({ channel_id, email }) {
        const user = await userRepository.findByEmail({ email });
        if (!user) {
            throw { status: 404, message: "Usuario no encontrado" };
        }

        const member = await channel_members_repository.create({
            member_id: user._id,
            channel_id
        });

        return member;
    
}

  async getByUserAndChannel({ member_id, channel_id }) {
    return await ChannelMembers.findOne({ member_id, channel_id });
  }
}


const channel_members_service = new ChannelMembersService();
export default channel_members_service;