import express from "express";
import authorizationMiddleware from "../middlewares/auth.middleware.js";
import workspaceMiddleware from "../middlewares/workspace.middleware.js";
import channelMiddleware from "../middlewares/channel.middleware.js";
import channel_members_controller from "../controllers/channelMembers.controller.js";

const channelMembersRouter = express.Router();

channelMembersRouter.use(authorizationMiddleware);

channelMembersRouter.post(
    "/:workspace_id/:channel_id",
    workspaceMiddleware,
    channelMiddleware,
    channel_members_controller.addMember
);

export default channelMembersRouter;
