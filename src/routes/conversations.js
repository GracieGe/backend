const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const conversationsController = require('../controllers/conversationsController');

// 创建或获取会话
router.post('/', auth, conversationsController.createOrFetchConversation);

// 获取会话的消息
router.get('/:conversationId/messages', auth, conversationsController.getMessages);

// 发送消息
router.post('/:conversationId/messages', auth, conversationsController.sendMessage);

// 获取所有会话信息
router.get('/all', auth, conversationsController.getAllConversations);

module.exports = router;