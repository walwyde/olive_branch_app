const { Conversation, Message } = require("../models/Message");
const User = require("../models/Users");

// Controller to store a new message
exports.createMessage = async (req, res) => {
  console.log(req.params);
  try {
    const { sender, conversation, timeSent, content } = req.body;

    let message = {};

    if (sender) message.sender = sender;
    if (conversation) message.conversation = conversation;
    if (!conversation) message.conversation = req.params.conversationId;
    if (timeSent) message.timeSent = timeSent;
    if (!timeSent) message.timeSent = date.now();
    if (content) message.content = content;

    const newMessage = new Message(message);

    // Save the message

    const savedMessage = await newMessage.save();

    const user = await User.findById(req.user.id).select("-password");

    user.messages.push(savedMessage._id);

    const convo = await Conversation.findOne({
      _id: savedMessage.conversation,
    });

    convo.messages.push(savedMessage._id);

    await convo.save();

    // Send the message to the client

    res.status(201).json(savedMessage);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

// Controller to retrieve all messages
exports.getAllMessages = async (req, res) => {
  // console.log(req.params);
  try {
    const { conversationId } = req.params;
    const messages = await Message.find({ conversation: conversationId });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

// Controller to get a single message by ID
exports.getConversationById = async (req, res) => {
  try {
    const { conversationId } = req.params;
    const { sender, content } = req.body;

    // Check if the conversation exists
    const conversation = await Conversation.findById(conversationId).populate(
      "messages"
    );
    if (!conversation) {
      return res.status(404).json({ error: "Conversation not found" });
    }

    // Create a new message
    const message = new Message({
      conversation: conversation._id,
      sender,
      content,
    });

    // Save the message
    await message.save();

    res.json(message);
  } catch (error) {
    res.status(500).json({ error: "Failed to send message" });
  }
};

exports.newConversation = async (req, res) => {
  try {
    const participants = [req.user.id, req.body._id];
    console.log(req.body);
    const existing = await Conversation.findOne({
      participants: { $all: participants },
    });
    if (existing) {
      const convo = await Conversation.findOne({
        participants: { $all: participants },
      })
        .populate("messages")
        .populate("participants");

      return res.status(200).json(convo);
    }

    const newConversation = new Conversation({
      participants,
    });

    await newConversation.save();
    const populatedConversation = await Conversation.findOne({
      participants: { $all: participants },
    }).populate("messages").populate("participants");

    res.status(200).json(populatedConversation);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

exports.getConversations = async (req, res) => {
  try {
    const userConversations = await Conversation.find({
      user: req.user.id,
    })
      .populate("messages")
      .populate("participants");

    if (userConversations.length > 0) return res.json(userConversations);

    const correspondentConvos = await Conversation.find({
      correspondent: req.user.id,
    })
      .populate("messages")
      .populate("participants");

    res.status(200).json(correspondentConvos);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};
