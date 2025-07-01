import channel_messages_service from "../services/channelMessages.service.js"
import channel_members_service from "../services/channelMembers.service.js";

class MessagesController {
    async create(request, response) {
        try {
            /*console.log('body:', request.body)
            console.log(request.workspace)
            console.log(request.user)
            console.log(request.channel)
            console.log('Se hizo el create') */
            const memberChannel = await channel_members_service.getByUserAndChannel({
                member_id: request.user.id,
                channel_id: request.channel._id
            });

            if (!memberChannel) {
                return response.status(403).json({
                    ok: false,
                    message: "El usuario no es miembro de este canal"
                });
            }
               console.log('request.user:', request.user)
                console.log('request.user.id:', request.user?.id)
            const messages_list = await channel_messages_service.create({
            

                member_channel_id: memberChannel._id,
                channel_id: request.channel._id,
                content: request.body.content,
                user_id: request.user.id
                               
            })
            response.json({
                ok: true,
                status: 201,
                data: {
                    messages: messages_list
                },
                message: 'Mensaje creado exitosamente'
            })

        }
        catch (error) {
            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        ok: false
                    }
                )
                return
            }
            else {
                console.log('Hubo un error', error)
                response.status(500).send({ message: 'Error interno del servidor', ok: false })
            }
        }

    }

    async getAllByChannel(request, response) {
        try {
            const { channel_id } = request.params
            const messages_list = await channel_messages_service.getAllByChannelId({ channel_id: channel_id })

            response.json({
                ok: true,
                status: 200,
                message: 'Mensajes obtenidos exitosamente',
                data: {
                    messages: messages_list
                }

            })
        }
        catch (error) {
            if (error.status) {
                response.status(error.status).send(
                    {
                        message: error.message,
                        ok: false
                    }
                )
                return
            }
            else {
                console.log('Hubo un error', error)
                response.status(500).send({ message: 'Error interno del servidor', ok: false })
            }
        }
    }
}

const messages_controller = new MessagesController()
export default messages_controller