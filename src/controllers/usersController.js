const userModel = require('../models/userModel');
const jwt = require('jsonwebtoken');

exports.createUser = async (req, res) => {
  const { email } = req.body;

  try {
    // check if the email already exists
    const existingUser = await userModel.getUserByEmail(email);
    if (existingUser) {
      return res.status(400).json({ msg: 'Email already exists' });
    }

    const user = await userModel.createUser(req.body);

    // Generate JWT token
    const payload = {
      user: {
        id: user.userId,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.status(201).json({ token, user: { id: user.userId, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    console.error('Error creating user:', err.message);
    res.status(500).send('Server error');
  }
};

exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.getUserByEmail(email);

    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    if (password !== user.password) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = {
      user: {
        id: user.userId,
        role: user.role
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '1h' },
      (err, token) => {
        if (err) throw err;
        res.json({ token, user: { id: user.userId, email: user.email, role: user.role } });
      }
    );
  } catch (err) {
    console.error('Error logging in:', err.message);
    res.status(500).send('Server error');
  }
};