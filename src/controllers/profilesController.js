const profileModel = require('../models/profileModel');
const {upload} = require('../middleware/upload');

exports.createProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    const { userId, role, fullName, gender, age, email, birthday } = req.body;
    let grade = null;
    if (role === 'student') {
      grade = req.body.grade;
    }
    const photo = req.file ? `/images/${role === 'student' ? 'students' : 'teachers'}/${req.file.filename}` : null;

    try {
      let profile;
      if (role === 'student') {
        profile = await profileModel.createStudentProfile({ userId, fullName, gender, age, email, birthday, grade, photo });
      } else if (role === 'teacher') {
        profile = await profileModel.createTeacherProfile({ userId, fullName, gender, age, email, birthday, photo });
      } else {
        return res.status(400).send('Invalid role');
      }
      res.status(201).json(profile);
    } catch (err) {
      console.error('Error creating profile:', err.message);
      res.status(500).send('Server error');
    }
  });
};