import ChannelMembers from "../models/ChannelMembers.model.js";

class ChannelMembersRepository {
    async create({ member_id, channel_id }) {
        const existing = await ChannelMembers.findOne({ member_id, channel_id });
        if (existing) return existing;

        const newMember = new ChannelMembers({ member_id, channel_id });
        await newMember.save();
        return newMember;
    }

    async findByUserAndChannel({ member_id, channel_id }) {
        return await ChannelMembers.findOne({ member_id, channel_id });
    }
}

const channel_members_repository = new ChannelMembersRepository();
export default channel_members_repository;
