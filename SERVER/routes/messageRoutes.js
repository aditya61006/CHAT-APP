import express from 'express'
import { protectRoute } from '../Middleware/auth.js';
import { getMessages, getUserForSiderbar, markMessagesAsSeen, sendMessage } from '../Controllers/messageControler.js';

const messageRouter = express.Router();

messageRouter.get("/users",protectRoute, getUserForSiderbar)
messageRouter.get("/:id",protectRoute, getMessages)
messageRouter.get("mark/:id",protectRoute, markMessagesAsSeen)
messageRouter.post("/send/:id",protectRoute, sendMessage)

export default messageRouter;   
