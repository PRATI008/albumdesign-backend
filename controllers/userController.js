const Users = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'singh_album_user_secret_2026';

// 1. User Sign Up (Register)
const registerUser = async (req, res) => {
  try {
    const { name, phone, email, password } = req.body;

    const existing = await Users.findOne({ email: email.toLowerCase() });
    if (existing) {
      return res.status(400).json({
        success: false,
        message: 'this email id is already account registered'
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await Users.create({
      name,
      phone,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: 'Registration Successful!.',
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 2. User Login
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Email/Phone and Password are required' });
    }

    const trimmedInput = email.trim();
    const query = trimmedInput.includes('@')
      ? { email: trimmedInput.toLowerCase() }
      : { phone: trimmedInput };

    const user = await Users.findOne(query);
    if (!user) {
      return res.status(401).json({ success: false, message: 'Account is not registered' });
    }

    if (user.status === 'Blocked') {
      return res.status(403).json({ success: false, message: 'The admin has blocked your account.' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Wrong Password!' });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '7d' });

    res.status(200).json({
      success: true,
      message: `Welcome back, ${user.name}!`,
      token,
      user: { id: user._id, name: user.name, email: user.email, phone: user.phone }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// 3. Admin Dashboard ke liye Saare Users lana
const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find().select('-password').sort({ createdAt: -1 });
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Users fetch failed' });
  }
};

// 4. Admin dwara User Edit karna
const updateUser = async (req, res) => {
  try {
    const updated = await Users.findByIdAndUpdate(req.params.id, req.body, { new: true }).select('-password');
    res.status(200).json({ success: true, user: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Update failed' });
  }
};

// 5. Admin dwara User Delete karna
const deleteUser = async (req, res) => {
  try {
    await Users.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true, message: 'User Deleted!' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Delete failed' });
  }
};

module.exports = { registerUser, loginUser, getAllUsers, updateUser, deleteUser };
