const bcrypt = require('bcryptjs');
const User = require('../models/User');

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ msg: 'All fields are required' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).json({ msg: 'User registered', user });
  } catch (err) {
    res.status(500).json({ msg: 'Server error', error: err.message });
  }
};

// ✅ Add this:
exports.login = async (req, res) => {
  res.status(200).json({ msg: 'Login successful', user: req.user });
};

// ✅ Add this:
exports.logout = (req, res) => {
  req.logout(() => {
    res.json({ msg: 'Logged out' });
  });
};
