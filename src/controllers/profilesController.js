const profileModel = require('../models/profileModel');

exports.createProfile = async (req, res) => {
  const { userId, role, fullName, gender, age, phoneNum, birthday, grade } = req.body;

  try {
    let profile;
    if (role === 'student') {
      profile = await profileModel.createStudentProfile({ userId, fullName, gender, age, phoneNum, birthday, grade });
    } else if (role === 'teacher') {
      profile = await profileModel.createTeacherProfile({ userId, fullName, gender, age, phoneNum, birthday });
    } else {
      return res.status(400).send('Invalid role');
    }
    res.status(201).json(profile);
  } catch (err) {
    console.error('Error creating profile:', err.message);
    res.status(500).send('Server error');
  }
};