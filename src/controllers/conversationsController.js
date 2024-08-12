const conversationModel = require('../models/conversationModel');
const messageModel = require('../models/messageModel');
const teacherModel = require('../models/teacherModel');
const studentModel = require('../models/studentModel');

exports.createOrFetchConversation = async (req, res) => {
  const userId = req.user.id;
  const { teacherId } = req.body; 

  try {
    let studentId, finalTeacherId;

    if (req.user.role === 'student') {
      const studentData = await studentModel.getStudentIdByUserId(userId);
      studentId = studentData.studentId;  
      finalTeacherId = teacherId;
    } else if (req.user.role === 'teacher') {
      finalTeacherId = await teacherModel.getTeacherIdByUserId(userId);
      const studentData = await studentModel.getStudentIdByUserId(teacherId);
      studentId = studentData.studentId;  
    } else {
      return res.status(400).json({ msg: 'Invalid user role' });
    }

    if (!studentId || !finalTeacherId) {
      return res.status(400).json({ msg: 'Invalid student or teacher ID' });
    }

    // check if the conversation already exists
    let conversation = await conversationModel.getConversationByStudentAndTeacher(studentId, finalTeacherId);

    if (!conversation) {
      // create a new conversation
      const conversationId = await conversationModel.createConversation(studentId, finalTeacherId);
      conversation = { conversationId };
    }

    res.status(200).json(conversation);
  } catch (err) {
    console.error('Error creating or fetching conversation:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    const messages = await messageModel.getMessagesByConversationId(conversationId);
    res.json(messages);
  } catch (err) {
    console.error('Error fetching messages:', err.message);
    res.status(500).send('Server error');
  }
};

exports.sendMessage = async (req, res) => {
  const { conversationId } = req.params;
  const { text } = req.body;
  const userId = req.user.id;

  try {
    const message = await messageModel.createMessage({
      conversationId,
      senderId: userId,
      text
    });

    res.status(201).json(message);
  } catch (err) {
    console.error('Error sending message:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getAllConversations = async (req, res) => {
  const userId = req.user.id;
  const role = req.user.role;

  try {
    let conversations;

    if (role === 'student') {
      const student = await studentModel.getStudentIdByUserId(userId);
      if (!student) {
        return res.status(400).json({ msg: 'No student found for this user' });
      }
      conversations = await conversationModel.getConversationsByStudentId(student.studentId);
    } else if (role === 'teacher') {
      const teacher = await teacherModel.getTeacherIdByUserId(userId);
      if (!teacher) {
        return res.status(400).json({ msg: 'No teacher found for this user' });
      }
      conversations = await conversationModel.getConversationsByTeacherId(teacher.teacherId);
    } else {
      return res.status(400).json({ msg: 'Invalid role' });
    }

    if (!conversations || conversations.length === 0) {
      return res.status(200).json({ msg: 'No conversations found' });
    }

    res.status(200).json(conversations);
  } catch (err) {
    console.error('Error fetching conversations:', err.message);
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.markMessagesAsRead = async (req, res) => {
  const { conversationId } = req.params;
  const userId = req.user.id;

  try {
    await messageModel.markMessagesAsRead(conversationId, userId);
    res.status(200).json({ msg: 'Messages marked as read' });
  } catch (err) {
    console.error('Error marking messages as read:', err.message);
    res.status(500).send('Server error');
  }
};