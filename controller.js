// API.js
const express = require("express");
const router = express.Router();

router.get("/messages", (req, res) => {
  // Get all chat messages from the database.
  const chatMessages = mongoose.model("ChatMessage").find();

  // Send the chat messages to the client.
  res.json(chatMessages);
});

router.post("/messages", (req, res) => {
  // Save the message to the database.
  const chatMessage = {
    sender: req.body.sender,
    message: req.body.message,
  };
  mongoose.model("ChatMessage", chatMessage).save();

  // Redirect the user to the chat page.
  res.redirect("/chat");
});

module.exports = router;
