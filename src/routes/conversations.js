const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const conversationsController = require('../controllers/conversationsController');

router.post('/', auth, conversationsController.createOrFetchConversation);
router.get('/:conversationId/messages', auth, conversationsController.getMessages);
router.post('/:conversationId/messages', auth, conversationsController.sendMessage);
router.get('/all', auth, conversationsController.getAllConversations);
router.post('/:conversationId/markAsRead', auth, conversationsController.markMessagesAsRead);

module.exports = router;