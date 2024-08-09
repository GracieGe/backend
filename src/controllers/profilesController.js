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

exports.getProfile = async (req, res) => {
  const userId = req.user.id;
  console.log('Received request to fetch profile for userId:', userId);

  try {
    const role = await profileModel.getUserRole(userId);

    let profile;
    if (role === 'student') {
      profile = await profileModel.getStudentProfile(userId);
    } else if (role === 'teacher') {
      profile = await profileModel.getTeacherProfile(userId);
    }

    if (!profile) {
      return res.status(404).json({ msg: 'Profile not found' });
    }

    res.json({ ...profile, role });
  } catch (err) {
    console.error('Error fetching profile data:', err.message);
    res.status(500).send('Server error');
  }
};

exports.updateProfile = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err });
    }

    const userId = req.user.id;
    const { fullName, gender, age, email, birthday } = req.body;
    let grade = null;
    if (req.body.role === 'student') {
      grade = req.body.grade;
    }
    const photo = req.file ? `/images/${req.body.role === 'student' ? 'students' : 'teachers'}/${req.file.filename}` : null;

    try {
      let updatedProfile;
      if (req.body.role === 'student') {
        updatedProfile = await profileModel.updateStudentProfile(userId, { fullName, gender, age, email, birthday, grade, photo });
      } else if (req.body.role === 'teacher') {
        updatedProfile = await profileModel.updateTeacherProfile(userId, { fullName, gender, age, email, birthday, photo });
      } else {
        return res.status(400).send('Invalid role');
      }
      res.status(200).json(updatedProfile);
    } catch (err) {
      console.error('Error updating profile:', err.message);
      res.status(500).send('Server error');
    }
  });
};