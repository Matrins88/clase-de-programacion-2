import channel_members_service from "../services/channelMembers.service.js"

class ChannelMembersController {
    async addMember(request, response) {
        try {
            const { channel_id } = request.params;
            const { email } = request.body;

            const new_member = await channel_members_service.addMember({ channel_id, email });

            response.status(201).json({
                ok: true,
                message: "Miembro agregado correctamente",
                data: { member: new_member }
            });
        } catch (error) {
            console.error("Error al agregar miembro:", error);
            const status = error.status || 500;
            response.status(status).json({ ok: false, message: error.message });
        }
    }
}

const channel_members_controller = new ChannelMembersController();
export default channel_members_controller;
