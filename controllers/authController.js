const Admin = require('../models/Admin')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'singh_admin_secret_key_2026';

const setupAdmin = async (req,res)=>{
    try {
       const existingAdmin = await Admin.findOne();
       if(existingAdmin) {
        return res.status(403).json({
            success: false,
            message: 'already admin registerd'
        });
       }
       const {name, email , password} = req.body;
       const hashedPassword = await bcrypt.hash(password, 10);

       const admin = await Admin.create({
        name: name || 'Singh Admin',
        email,
        password: hashedPassword
       });
       res.status(201).json({
success:true,
message: 'Admin Login Successfully',
admin:{id: admin._id, email: admin.email}
       });
    } catch (error) {
       res.status(500) .json({success:false, message: error.message });
    }
};

const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email.toLowerCase() });
    if (!admin) {
      return res.status(401).json({
        success: false,
        message: 'email is not valid.'
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'wrong Password!'
      });
    }
    const token = jwt.sign({ id: admin._id, email: admin.email }, JWT_SECRET, {
      expiresIn: '7d'
    });

    res.status(200).json({
      success: true,
      message: 'Login Successful!',
      token,
      admin: { name: admin.name, email: admin.email }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { setupAdmin, loginAdmin };