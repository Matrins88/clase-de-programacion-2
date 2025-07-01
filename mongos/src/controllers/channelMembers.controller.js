import channel_members_service from "../services/channelMembers.service.js";

class ChannelMembersController {
    async add(request, response) {
        try {
            const { member_id } = request.body;
            const { channel_id } = request.params;

            if (!member_id || !channel_id) {
                return response.status(400).json({
                    ok: false,
                    message: "member_id y channel_id son obligatorios"
                });
            }

            const newMember = await channel_members_service.create({
                member_id,
                channel_id
            });

            response.status(201).json({
                ok: true,
                message: "Miembro agregado al canal",
                data: newMember
            });
        } catch (error) {
            console.error(error);
            response.status(500).json({
                ok: false,
                message: "Error interno del servidor"
            });
        }
    }
}
const channelMembersController = new ChannelMembersController();
export default channelMembersController