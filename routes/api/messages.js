const express = require("express");
const router = express.Router();
const auth = require("../../middleware/index")
const controller = require("../../controllers/message");

router.get("/", auth.auth, controller.getConversations);

router.get(
  "/:conversationId/messages",
  auth.auth,
  controller.getAllMessages
);

router.post(
  "/:conversationId/messages",
  auth.auth,
  controller.createMessage
);

router.get("/:conversationId/", auth.auth, controller.getConversationById);


router.post('/:id', auth.auth, controller.newConversation);

module.exports = router;
