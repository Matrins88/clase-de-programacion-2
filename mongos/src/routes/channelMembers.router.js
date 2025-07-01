import express from 'express';
import channel_members_controller from '../controllers/channelMembers.controller.js';
import authorizationMiddleware from '../middlewares/auth.middleware.js'; // 👈 importá esto

const channelMembersRoutes = express.Router();

channelMembersRoutes.post(
  '/:channel_id',
  authorizationMiddleware, // 👈 protegé la ruta
  channel_members_controller.add
);

export default channelMembersRoutes;
