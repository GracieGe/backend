const conversationModel = require('../models/conversationModel');
const messageModel = require('../models/messageModel');
const teacherModel = require('../models/teacherModel');
const studentModel = require('../models/studentModel');

exports.createOrFetchConversation = async (req, res) => {
  const userId = req.user.id;
  const { teacherId } = req.body; // 从前端传来的老师的ID

  try {
    console.log('User ID:', userId);
    console.log('Teacher ID:', teacherId);
    // 判断用户角色，获取 studentId 或 teacherId
    let studentId, finalTeacherId;

    if (req.user.role === 'student') {
      // 学生发起聊天，传入的 teacherId 直接使用
      const studentData = await studentModel.getStudentIdByUserId(userId);
      studentId = studentData.studentId;  // 提取出 studentId
      finalTeacherId = teacherId;
    } else if (req.user.role === 'teacher') {
      // 老师查看会话，teacherId 实际上是学生的 userId
      finalTeacherId = await teacherModel.getTeacherIdByUserId(userId);
      const studentData = await studentModel.getStudentIdByUserId(teacherId); // 注意这里的 teacherId 实际是学生的 userId
      studentId = studentData.studentId;  // 提取出 studentId
    } else {
      return res.status(400).json({ msg: 'Invalid user role' });
    }

    console.log('Final Teacher ID:', finalTeacherId);
    console.log('Student ID:', studentId);

    if (!studentId || !finalTeacherId) {
      console.log('Invalid student or teacher ID');
      return res.status(400).json({ msg: 'Invalid student or teacher ID' });
    }

    // 检查是否已经存在会话
    let conversation = await conversationModel.getConversationByStudentAndTeacher(studentId, finalTeacherId);

    if (!conversation) {
      // 如果会话不存在，创建一个新的会话
      console.log('No conversation found, creating new one...');
      const conversationId = await conversationModel.createConversation(studentId, finalTeacherId);
      conversation = { conversationId };
    }

    console.log('Conversation found or created:', conversation);
    res.status(200).json(conversation);
  } catch (err) {
    console.error('Error creating or fetching conversation:', err.message);
    res.status(500).send('Server error');
  }
};

exports.getMessages = async (req, res) => {
  const { conversationId } = req.params;

  try {
    console.log('Fetching messages for conversation ID:', conversationId);
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
    console.log('Sending message in conversation ID:', conversationId, 'by user ID:', userId);
    const message = await messageModel.createMessage({
      conversationId,
      senderId: userId,
      text
    });

    console.log('Message created:', message);
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

    res.status(200).json(conversations);
  } catch (err) {
    console.error('Error fetching conversations:', err.message);
    res.status(500).send('Server error');
  }
};