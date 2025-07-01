import express from 'express'
import workspaceMiddleware from '../middlewares/workspace.middleware.js'
import channelMiddleware from '../middlewares/channel.middleware.js'
import messages_controller from '../controllers/messages.controller.js'
import authorizationMiddleware from '../middlewares/auth.middleware.js'

const messageRouter = express.Router()

//Necesito saber que sea un cliente
messageRouter.use(authorizationMiddleware)


messageRouter.post(
    '/:workspace_id/:channel_id', 
    workspaceMiddleware,
    channelMiddleware,
    messages_controller.create
)

messageRouter.get(
    '/:workspace_id/:channel_id', 
    workspaceMiddleware,
    channelMiddleware,
    messages_controller.getAllByChannel
)

export default messageRouter